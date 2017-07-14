const config = require('./config');
const mongoose = require('mongoose');
//mongoose.connect(config.db.mongo.url);

mongoose.connect(config.db.mongo.url, {
    useMongoClient: true,
    /* other options */
});
module.exports = mongoose;