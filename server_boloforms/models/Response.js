const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
    form: { type: mongoose.Schema.Types.ObjectId, ref: 'Form' },
    answers: [{ question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' }, answer: String }],
});

module.exports = mongoose.model('Response', responseSchema);
