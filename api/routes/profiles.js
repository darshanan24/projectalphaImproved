
var ObjectId = require('mongodb').ObjectID;
const express = require("express");

const router = express.Router();
const mongoose = require("mongoose");

const Profile = require("../models/profile");
//const EventMetric = require("../models/profile");

router.get("/", (req, res, next) => {
    Profile.find()
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                profiles: docs.map(doc => {
                    return {
                       Name: doc.Name,
                       EventMetrics: doc.EventMetrics,
                       Metrics: doc.Metrics,
                        _id: doc._id
                    };
                })
            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.post("/", (req, res, next) => {
    console.log( req.body);
    const profile = new Profile({
        _id: new mongoose.Types.ObjectId(),
        Name: req.body.Name,
        EventMetrics: req.body.EventMetrics,
        Metrics: req.body.Metrics
    });
    profile
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Created profile successfully",
                createdProfile: {
                Name: result.Name,
                _id: result._id,
                EventMetrics: result.EventMetrics,
                Metrics: result.Metrics              
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

router.get("/:profileId", (req, res, next) => {
    const id = req.params.profileId;
    Profile.findById(id)
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json({
                    profile: doc,
                });
            } else {
                res.status(404)
                    .json({ message: "No valid entry found for provided ID" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});


router.delete("/:profileId", (req, res, next) => {
    const id = req.params.profileId;
    Profile.remove({ _id: id })
        .exec()
        .then(result =>
            res.status(200).json({
                message: 'Profile deleted'
            }))
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.post("/:profileId/update", (req, res, next) => {
    const profileid = req.params.profileId;
    const EventMetric = req.body;
    console.log(EventMetric);
    Profile.findByIdAndUpdate({_id : profileid }, { $push: {EventMetrics:EventMetric}})
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Profile updated',
                });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.post("/:profileId/:eventMetricId/update", (req, res, next) => {
    const profileid = req.params.profileId;
    const eventMetricId = req.params.eventMetricId;
    const Metric = req.body;
    console.log(Metric);
    
     Profile.findOneAndUpdate({"EventMetrics._id":ObjectId(eventMetricId),"_id":ObjectId(profileid)},
     {$push: {"EventMetrics.$[b].Metrics":Metric } },
     {
        "new": false,
        "arrayFilters": [
         { "b._id":ObjectId(eventMetricId) } 
       ]
     })
   .exec()
   .then( result => {
            console.log(result);
            console.log(Metric);
            res.status(200).json({
                message: result,
                });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});



module.exports = router;
