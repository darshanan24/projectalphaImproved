const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//schema models to follow
const Project = require("../models/project");
const RawEvent = require("../models/rawEvent");

//handling get requests
router.get("/:projectId/events/raw", (req, res, next) => {
    const projectId = req.params.projectId;
    console.log(projectId);
       RawEvent.find({"projectId" :projectId})
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                rawEvents: docs.map(doc => {
                    return {
                        _id: doc._id,
                        name: doc.name,
                        description: doc.description,
                        type: doc.type,
                        source: doc.source,
                        projectId: doc.projectId
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


router.post("/:projectId/events/raw", (req, res) => {
    const rawEvent = new RawEvent({
            _id: new mongoose.Types.ObjectId(),
                name: req.body.name,
                description: req.body.description,
                type: req.body.type,
                source: req.body.source,
                projectId: req.params.projectId // just project and not projectId
            });
            return rawEvent.save()
        
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Created RAW EVENT successfully",
                createdRawEvent: {
                    name: result.name,
                    description: result.description,
                    type: result.type,
                    source: result.source,
                    _id: result._id,
                    projectId: result.projectId
                }
            });
            Project.findOneAndUpdate({ _id: result.projectId},
                { $push: { rawEvents:  result._id} },
                function (error, success) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log(success);
                    }
                });   
            const host = "localhost:2181";
            const topic = "/opt/kafka_2.11-1.0.0/bin/kafka-topics.sh --create --zookeeper " + host +" --replication-factor 1 --partitions 1 --topic " + result.name;
            shell.exec(topic);
            shell.exec('/opt/kafka_2.11-1.0.0/bin/kafka-topics.sh --list --zookeeper ' + host);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});



router.get("/:projectId/event/raw/:rawEventId", (req, res, next) => {
    const projectId = req.params.projectId;
    const id = req.params.rawEventId;
    Project.findById(projectId)
    .exec()
    .then(projectId =>{
    if(projectId) {
    RawEvent.findById(id)
        .exec()
        .then(doc => {
            if (doc.projectId == projectId.id) {
                res.status(200).json({
                    rawEvent: doc,
                })
            } else {
                res.status(404)
                    .json({ message: "No valid entry found for provided ID" });
            }
        })
    } else if(projectId == null){
        res.status(400).json({
            message: "projectId is invalid"
        })
    }
})
});
// the "patch" snippet might come in handy when we need to edit every parameter in api raw events
/*
router.patch("/:rawEventId", (req, res, next) => {
    const id = req.params.rawEventId;
    const updateOps = {};
    for (const key of Object.keys(req.body)) {
        updateOps[key] = req.body[key]
    }
    RawEvent.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Raw Event updated'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});
*/

router.delete("/:projectId/event/raw/:rawEventId", (req, res, next) => {
    const rawEventId = req.params.rawEventId;
    const projectId= req.params.projectId;
    //console.log(enrichedEventId);
    console.log(projectId);
    Project.findOneAndUpdate({ _id: projectId},
            { $pull: { rawEvents:  rawEventId} })
    .exec()
    .then(project =>{
    if(project) {
        console.log("--------------");
        console.log(rawEventId);
      RawEvent.remove({ _id: rawEventId })
        .exec()
        .then(result => {
            if (result.n === 0 ){
                return res.status(404).json({
                  message: "ID not found"
                })}else{
                    console.log(result);
                    res.status(200).json({
                    message: "event removed"});
                }
    })
    } else if(projectId == null){
        res.status(400).json({
            message: "projectId is invalid"
        })}
    })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});



router.get("/:projectId/event/raw", (req, res, next) => {
    const projectId = req.params.projectId;
    const name = req.query.name;
    console.log(projectId);
    console.log(name);
    Project.findById(projectId)
    .exec()
    .then(project =>{
    if(project) {
    RawEvent.find({'name':name})
        .exec()
        .then(doc => {
            if (doc[0].projectId == project.id) {
                res.status(200).json({
                    rawEvent: doc,
                })
            } else {
                res.status(404)
                    .json({ message: "No valid entry found for provided ID" });
            } 
        })
    } else if(project == null){
        res.status(400).json({
            message: "projectId is invalid"
        })
    }
    })  
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;