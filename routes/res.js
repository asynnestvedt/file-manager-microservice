let file = require('../lib/file.model.js');

module.exports = function(app, db) {

    app.get('/res/:id?', function (req, res, next) {
        // read file from cache or aws
        
        res.type('get-mime-type');
        res.status(200).send(JSON.stringify(filedocs));
    });
};