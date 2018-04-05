const mongoose = require('mongoose');

/*
const delSchema = mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ["dimension", "metric", "ID"], required: true },
    position: { type: Number, required: true },
    dataType: { type: String, enum: ["int", "float", "string"], required: true }
});

const jsSchema = mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ["dimension", "metric", "ID"], required: true },
    oldkeyName: { type: String, required: true },
    newkeyName: { type: String, required: true },
    dataType: { type: String, enum: ["int", "float", "string"], required: true }
});

const fwSchema = mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ["dimension", "metric", "ID"], required: true },
    startIndex: { type: Number, required: true },
    endIndex: { type: Number, required: true },
    dataType: { type: String, enum: ["int", "float", "string"], required: true }
}); */ // its of no use as Eschema is now mixed type

const enrichedEventSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    name: { type: String, required: true, unique: true },
    description: { type: String, required: false },
    type: { type: String, enum: ["Enriched"], required: true },
    source: { type: String, required: true },
    Eschema: [],
    parentId: { type: String, required: true },
    delimiter: { type: String, required: true }
});

module.exports = mongoose.model('EnrichedEvent', enrichedEventSchema);