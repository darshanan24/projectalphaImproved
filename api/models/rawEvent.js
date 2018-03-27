const mongoose = require('mongoose');

const rawEventSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required:true},
    description: {type: String, required: false},
    type: {type: String,enum:["R","E"], required:true },
    source: {type:String, required: true}
});

module.exports = mongoose.model('RawEvent', rawEventSchema );
