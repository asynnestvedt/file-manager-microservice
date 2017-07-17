const mongoose = require('../config/db');

const Schema = new mongoose.Schema({
    name: String,
    details: { type: String, default: '' },
    meta: {
        size: String,
        ext: String,
        res: {
            w: Number,
            h: Number
        },
        original_name: String,
        created: { type: Date, default: Date.now },
        creator: { type: String, default: 'Alan' }
    },
    users: [String],
    access: [String],
    payload: String,
    status: Boolean,
    archive: Boolean
});

var File = mongoose.model('File', Schema);

module.exports = File;



// File.pre('set', (data, cb) => {


//         console.log(data);
//     })
// var file = new File({ name: 'abcd.jpg' });

// file.save(function(err) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log('meow');
//     }
// });