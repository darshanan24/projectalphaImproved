const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");


const RawEvent = require("../models/rawEvent");

// Handle incoming GET requests to /events
router.get("/", (req, res, next) => {
    RawEvent.find()
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
                        source:doc.source,
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
    const rawEvent = new RawEvent({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description,
        type: req.body.type,
        source: req.body.source
    });
    rawEvent
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Created RAW EVENT successfully",
                createdRawEvent: {
                    name: result.name,
                    description: result.description,
                    type: result.type,
                    source: result.source,
                    _id: result._id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});



router.get("/:rawEventId", (req, res, next) => {
    const id = req.params.rawEventId;
    RawEvent.findById(id)
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json({
                    rawEvent: doc,
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

router.delete("/:rawEventId", (req,res,next) =>{
    const id = req.params.rawEventId;
    RawEvent.remove({_id : id})
        .exec()
        .then(result =>
            res.status(200).json({
                message: 'Raw Event deleted'
            }))
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error:err
            });
        });
});

module.exports =router;