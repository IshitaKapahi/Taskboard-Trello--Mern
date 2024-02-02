const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'done'],
        default: 'pending'
    }


},
    { timestamps: true }
);

const TaskList = mongoose.model('TaskList', TaskSchema, 'TaskList');

module.exports = TaskList;