const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');

const projectSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    projectName: { type: String, required: true, unique: true },
    projectDescription: { type: String, required: false },
    dimensions: { type: [], required: false },
   // events: [{type: mongoose.Schema.Types.ObjectId, ref: 'RawEvent', autopopulate:true}],
    enrichedEvents: [{type: mongoose.Schema.Types.ObjectId, ref: 'EnrichedEvent'}],
    customers: { type: [], required: false}
});
projectSchema.plugin(autopopulate);

module.exports = mongoose.model('Project', projectSchema);
