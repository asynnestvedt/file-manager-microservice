let file = require('../lib/file.model.js');
const formidable = require('express-formidable');

module.exports = function(app, db) {

    app.use(formidable());

    app.post('/files', function (req, res) {
        res.type('json');
        let file = new file(req.body.payload, req.body.metadata, req.body.when, req.body.archive || null);

        


        fs.readFile(req.files.displayImage.path, function (err, data) {
        // ...
        var newPath = __dirname + "/uploads/uploadedFileName";
            fs.writeFile(newPath, data, function (err) {
                res.redirect("back");
            });
        });

        if(file.isValid()) {
            db.files_write(file.unified(), function(err, filedoc) {
                if (!err) {
                    res.status(201).send(JSON.stringify( {_id: filedoc._id} ));
                } else {
                    res.type('text/plain');
                    res.status(400).send("duplicate entry");
                }
            });
        } else {
            res.type('text/plain');
            res.status(400).send("files require 'payload' and 'when' attributes");
        }
    });

    app.get('/files/:filter?', function (req, res, next) {
        res.type('json');
        let filter = {};
        
        try {
            filter = JSON.parse(req.params.filter || "{}");
        } catch (e){
            res.status(400).send(e); 
            return next(new Error(e.message));
        }
        
        db.files_read(filter, null, null, function(err, filedocs) {
            if(!err) {
                res.status(200).send(JSON.stringify(filedocs));
            } else {
                res.status(400).send("no records found");
            }
        });
    });

    app.delete('/files/:_ids', function (req, res, next) {
        let ids = [];
        try {
            ids = JSON.parse(req.params._ids) || [];
        } catch (e) {
            res.status(400).send(e);
            return next(new Error[e.message]);
        }
        
        for(let i=0; i < ids.length; ++i) {
            let filter = {_id: ids[i]};
            db.files_read(filter, null, null, function(err, jsonDoc){
                if(!err) {
                    jsonDoc.status = "cancelled";
                    db.log_write(jsonDoc);
                }
            });
            db.files_remove(filter, function(err, filedocs) {
                if(!err) {
                    res.status(200).send(JSON.stringify("success"));
                } else {
                    res.status(400).send("no records found");
                }
            });
        }
    });

}
