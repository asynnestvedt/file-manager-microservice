module.exports = function(app, db) {

    //lets get user identity... try JWT
    // ... no JWT??... check if there is a custom user header "X-Users" with array from ids
    // .. is it a POST?... maybe there's a UserID ??

    require('./files.js')(app, db);
    require('./res.js')(app, db);
};