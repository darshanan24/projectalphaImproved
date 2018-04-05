const mongoose = require('mongoose');


const projectSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    projectName: { type: String, required: true, unique: true },
    projectDescription: { type: String, required: false },
    dimensions: { type: [], required: false },
    events: { type: [], required: false, unique: true },
    customers: { type: [], required: false }
});

module.exports = mongoose.model('Project', projectSchema);
