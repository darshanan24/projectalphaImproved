const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
//routing to different apis
const projectRoutes = require("./api/routes/projects");
const profileRoutes = require("./api/routes/profiles");
const enrichedEventRoutes = require("./api/routes/enrichedEvents");
const rawEventRoutes = require("./api/routes/rawEvents");
//const kafkadataRoutes = require("./api/routes/confluentkafkadata");
//connection to mongo db, db name is test
mongoose.connect("mongodb://127.0.0.1:27017/test");
//to avoid depricated warning
mongoose.Promise = global.Promise;
// can Remove this app.use(morgan("dev")) before releasing to production 
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false })); // extended is false, coz since we are not using complicated urls. If i do, then performance may not be optimum.
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

// Routes which should handle requests
app.use("/projects", projectRoutes);  //base path for projects
app.use("/profiles", profileRoutes);
app.use("/events/enriched", enrichedEventRoutes);  //base path for Enriched Event
app.use("/events/raw", rawEventRoutes);  //base path for Raw Event
//app.use("/confluent/kafka",kafkadataRoutes);
// applicable to all apis
app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});
// applicable to all apis
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
