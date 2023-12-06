const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    type: { type: String, enum: ['Categorize', 'Cloze', 'Comprehension'], required: true },
    content: { type: String, required: true },
    image: { type: String },
});

module.exports = mongoose.model('Question', questionSchema);
