module.exports = function(app, db) {
    require('./files.js')(app, db);
    require('./res.js')(app, db);

};