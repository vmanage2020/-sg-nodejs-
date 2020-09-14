const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    fname: String,
    email: String,
    password: String,
    phone: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Note', NoteSchema);
