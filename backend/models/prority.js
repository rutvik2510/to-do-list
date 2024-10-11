const mongoose = require('mongoose')

const prioritySchema = new mongoose.Schema({
    level: {
        type: String,
        required: true,
        enum: ['Low', 'Medium', 'High', 'Extreme'],
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


const Priority = mongoose.model('Priority', prioritySchema);

module.exports = Priority;