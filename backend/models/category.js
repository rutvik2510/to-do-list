const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    Cname: {
        type: String,
        required: true,
        unique: true,

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

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;