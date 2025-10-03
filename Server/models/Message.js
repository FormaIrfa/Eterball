const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    messageSender: { type: String, required: true },
    messageTarget: { type: String },
    content: { type: String, required: true },
    createdAt: { type: Date}
})

module.exports = mongoose.model('Message', MessageSchema)