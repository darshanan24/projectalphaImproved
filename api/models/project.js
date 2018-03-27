const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    event_id: mongoose.Schema.Types.ObjectId
});


const projectSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    projectName: { type: String, required: true, unique:true },
    projectDescription: { type: String, required: false },
    dimensions: { type: [], required: false },
    events: [eventSchema],	
    customers: {type: [],required: false}
});

module.exports = mongoose.model('Project', projectSchema);
