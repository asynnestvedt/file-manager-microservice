const mongoose = require('../config/db');

const Schema = new mongoose.Schema({
    hash: { type: String, index: true, required: true },
    name: String,
    descr: { type: String, default: '' },
    meta: {
        mime: { type: String, required: true },
        ver: Number,
        size: String,
        ext: String,
        res: {
            w: Number,
            h: Number
        },
        original_name: String,
        created: { type: Date, default: Date.now },
        creator: { type: String, default: 'Alan' },
        tags: { type: [String], index: true }
    },
    users: { type: [String], index: true },
    access: { type: [String], index: true },
    status: { type: Boolean, default: false },
    archive: { type: Boolean, default: false }
});

var File = mongoose.model('File', Schema);

module.exports = File;