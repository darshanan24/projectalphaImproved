const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Project = require("../models/project");
const Event = require("../models/event");

// Handle incoming GET requests to /events
router.get("/", (req, res, next) => {
    Event.find()
    .exec()
    .then(docs => {
    res.status(200).json({
    count: docs.length,
    events: docs.map(doc => {
        return {
            _id: doc._id,
            eventName: doc.eventName,
            eventDescription: doc.eventDescription,
            eventType: doc.eventType,
            eventSource:doc.eventSource,
            eventSchema:doc.eventSchema
        };
})
});
})
.catch(err => {
    res.status(500).json({
    error: err
});
});
});


router.post("/", (req, res, next) => {
   // Project.findById(req.body.projectId);
   /* .then(project => {
    if (!project) {
    return res.status(404).json({
        message: "Project not found"
    });
}*/
const event = new Event({
    _id: mongoose.Types.ObjectId(),
    eventName: req.body.eventName,
   // project: req.body.projectId,
    eventDescription: req.body.eventDescription,
    eventType: req.body.eventType,
    eventSource: req.body.eventSource,
    eventSchema: req.body.eventSchema
});
 return event.save()
//})
.then(result => {
    console.log(result);
res.status(201).json({
    message: "Event stored",
    createdEvent: {
        _id: result._id,
       // project: result.project,
        eventName: result.eventName,
        eventDescription: result.eventDescription,
        eventType: result.eventType,
        eventSource: result.eventSource,
        eventSchema: result.eventSchema
},
});
})
.catch(err => {
    console.log(err);
res.status(500).json({
    error: err
});
});
});

/*router.post("/", (req, res, next) => {
    Project.findById(req.body.projectId)
    .then(project => {
    if (!project) {
    return res.status(404).json({
        message: "Project not found"
    });
}
const event = new Event({
    _id: mongoose.Types.ObjectId(),
    eventName: req.body.eventName,
    project: req.body.projectId,
    eventDescription: req.body.eventDescription,
    eventType: req.body.eventType,
    eventSource: req.body.eventSource,
    eventSchema: req.body.eventSchema
});
return event.save();
})
.then(result => {
    console.log(result);
res.status(201).json({
    message: "Event stored",
    createdEvent: {
        _id: result._id,
        project: result.project,
        eventName: result.eventName,
        eventDescription: result.eventDescription,
        eventType: result.eventType,
        eventSource: result.eventSource,
        eventSchema: result.eventSchema
},
});
})
.catch(err => {
    console.log(err);
res.status(500).json({
    error: err
});
});
});*/                               // original written code for getting project id


module.exports = router;

