const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Project = require("../models/project");
const EnrichedEvent = require("../models/enrichedEvent");
const shell = require("shelljs");

// Handle incoming GET requests to /events
router.get("/", (req, res, next) => {
    EnrichedEvent.find()
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                enrichedEvents: docs.map(doc => {
                    return {
                        _id: doc._id,
                        name: doc.name,
                        description: doc.description,
                        type: doc.type,
                        source: doc.source,
                        Eschema: doc.Eschema,
                        delimiter: doc.delimiter,
                        parentId: doc.parentId
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
    const enrichedEvent = new EnrichedEvent({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        projectId: req.body.projectId,
        description: req.body.description,
        type: req.body.type,
        source: req.body.source,
        Eschema: req.body.Eschema,
        delimiter: req.body.delimiter,
        parentId: req.body.parentId
    });

    return enrichedEvent.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Event stored",
                createdEvent: {
                    _id: result._id,
                    projectId: result.projectId,
                    name: result.name,
                    description: result.description,
                    type: result.type,
                    source: result.source,
                    Eschema: result.Eschema,
                    delimiter: result.delimiter,
                    parentId: result.parentId
                }
            });

            console.log("projectid " +result.projectId );

            Project.findOneAndUpdate({ _id: result.projectId},
            { $push: { enrichedEvents:  result._id} },
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


router.get("/:enrichedEventId", (req, res, next) => {
    const id = req.params.enrichedEventId;
    EnrichedEvent.findById(id)
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json({
                    enrichedEvent: doc,
                });
            } else {
                res
                    .status(404)
                    .json({ message: "No valid entry found for provided ID" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

router.delete("/:enrichedEventId", (req, res, next) => {
    const id = req.params.enrichedEventId;
    EnrichedEvent.remove({ _id: id })
        .exec()
        .then(result =>
            res.status(200).json({
                message: 'Enriched Event deleted'
            }))
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get("/E/:character?", (req, res, next) => {
    const name = req.query.name;
    EnrichedEvent.findOne(name)
        .select('_id')
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json({
                    enrichedEvent: doc,
                });
            } else {
                res
                    .status(404)
                    .json({ message: "No valid entry found for provided name of Project" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

module.exports = router;