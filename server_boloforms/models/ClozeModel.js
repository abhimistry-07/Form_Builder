const mongoose = require('mongoose');

const clozeFormSchema = new mongoose.Schema({
    previewQuestion: String,
    question: String,
    underlinedWords: [String],
});


const ClozeFormModel = mongoose.model('clozeForm', clozeFormSchema);

module.exports = ClozeFormModel;