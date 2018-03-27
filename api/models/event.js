const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    //project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    eventName: { type: String, required: true },
    eventDescription: {type: String, required: false},
    eventType: {type:String, enum:["R","E"], required:true },
    eventSource: { type: String, required: true },
    //eventSchema: {type: [], required:true }
});

module.exports = mongoose.model('Event', eventSchema );