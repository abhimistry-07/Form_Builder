const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
});

const categorizeFormSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    headerImage: {
        type: String,
    },
    categories: [
        {
            type: String,
            required: true,
        },
    ],
    items: [itemSchema],
});

const CategorizeModel = mongoose.model('categorizeForm', categorizeFormSchema);

module.exports = CategorizeModel;

// {question: 'sdfhsdfjfj', headerImage: null, categories: Array(3), items: Array(3)}


// {
// question: 'sdfhsdfjfj',
// categories: (3) ['sgjsgjtyk', 'sdfjsfgj', 'sdfsf'],
// headerImage: null,
// items: Array(3)
// 0: {text: 'dgkd,y,u', category: 'sdfjsfgj'}
// 1: {text: 'dgkdghk', category: 'sdfsf'}
// 2: {text: 'dkdghk', category: 'sgjsgjtyk'}
// }