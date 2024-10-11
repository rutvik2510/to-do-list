const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date, // Changed to Date
        required: true // Make this required
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High', 'Extreme'], // Simplified the priorities
        required: true
    },

    taskimage: {
        type: String, // Path or URL to the image
        // Consider removing required if it's not always necessary
        required: false
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed'],
        default: 'Pending',
    },
    collaborators: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        permission: {
            type: String,
            enum: ['Edit', 'View'],
            default: 'View',
        },
    }, ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: Date,
});

const Task = mongoose.model('task', taskSchema);

module.exports = Task;