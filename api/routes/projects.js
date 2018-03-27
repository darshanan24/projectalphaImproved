const express = require("express");

const router = express.Router();
const mongoose = require("mongoose");

const Project = require("../models/project");

router.get("/", (req, res, next) => {
    Project.find()
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                projects: docs.map(doc => {
                    return {
                        projectName: doc.projectName,
                        projectDescription: doc.projectDescription,
                        dimensions: doc.dimensions,
                        events: doc.events,
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
    const project = new Project({
        _id: new mongoose.Types.ObjectId(),
        projectName: req.body.projectName,
        projectDescription: req.body.projectDescription,
        dimensions:req.body.dimensions,
        events: req.body.events
    });
    project
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Created project successfully",
                createdProject: {
                    projectName: result.projectName,
                    projectDescription: result.projectDescription,
                    _id: result._id,
                    events: result.events,
                    dimensions: result.dimensions
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

router.get("/:projectId", (req, res, next) => {
    const id = req.params.projectId;
Project.findById(id)
    .exec()
    .then(doc => {
    console.log("From database", doc);
if (doc) {
    res.status(200).json({
        project: doc,
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
/*
router.patch("/:projectId", (req, res, next) => {
    const id = req.params.projectId;
const updateOps = {};
    for (const key of Object.keys(req.body)) {//for (const ops of req.body) {updateOps[ops.propName] = ops.value;}
        updateOps[key] = req.body[key]
    }
Project.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
    res.status(200).json({
    message: 'Project updated'
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
router.delete("/:projectId", (req,res,next) =>{
    const id = req.params.projectId;
    Project.remove({_id : id})
        .exec()
        .then(result =>
        res.status(200).json({
            message: 'Project deleted'
        }))
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error:err
            });
        });
});


router.get("/P/:projectName", (req, res, next) => {
    const projectName = req.query.projectName;
    Project.findOne(projectName)
        .select('_id')
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json({
                    project: doc,
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

router.post("/:projectId/addEvent/", (req, res, next) => {
    const id = req.params.projectId;

    const project = new Project({
        event_id: new mongoose.Types.ObjectId(),
        events: req.body.events
    });
    project
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Created Event successfully",
                createdProject: {
                    event_id : result.event_id,
                    events: result.events
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





module.exports = router;
