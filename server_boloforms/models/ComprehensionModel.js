const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question: String,
    options: [String],
    answers: [String],
    selectedInputType: String,
});

const comprehensionFormSchema = new mongoose.Schema({
    passage: String,
    selectedImage: String,
    questions: [questionSchema],
});

const ComprehensionModel = mongoose.model(
    "comprehensionForm",
    comprehensionFormSchema
);

module.exports = ComprehensionModel;