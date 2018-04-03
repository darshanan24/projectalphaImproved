const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const projectRoutes = require("./api/routes/projects");
const enrichedEventRoutes = require("./api/routes/enrichedEvents");
const rawEventRoutes = require("./api/routes/rawEvents");

//const dimensionRoutes = require("./api/routes/dimensions");

mongoose.connect("mongodb://127.0.0.1:27017/test");

mongoose.Promise = global.Promise;

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
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
app.use("/projects", projectRoutes);
app.use("/events/enriched", enrichedEventRoutes);
app.use("/events/raw", rawEventRoutes);

//app.use("/dimensions", dimensionRoutes);

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
