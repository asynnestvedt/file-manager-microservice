const AWS = require('aws-sdk');
const config = require('../config/config');
const s3 = new AWS.S3({
    accessKeyId: config.storage.s3.key_id,
    secretAccessKey: config.storage.s3.secret,
    apiVersion: '2006-03-01'
});
const privateBucket = config.storage.s3.buckets.private;
const publicBucket = config.storage.s3.buckets.public;
const multer = require('multer')
const multerS3 = require('multer-s3')
const File = require('../model/file');
const crypto = require('crypto');

module.exports = function(app, db) {


    var upload = multer({
        storage: multerS3({
            s3: s3,
            bucket: privateBucket,
            metadata: function(req, file, cb) {
                console.log(file);
                cb(null, { fieldName: file.fieldname });
            },
            key: function(req, file, cb) {
                file.hash = crypto.createHash('md5').update('secret').digest('hex');
                file.ext = file.originalname.split('.').pop();
                cb(null, file.hash + "." + file.ext)
            }
        })
    })


    app.post('/files', upload.array('file', 15), function(req, res) {


        var fileobj = new Array();


        req.files.forEach(function(element) {

            file = new File({
                name: req.body.name,
                descr: req.body.details,
                hash: element.hash,
                meta: {
                    mime: element.mimetype,
                    size: element.size,
                    ext: element.ext,
                    original_name: element.originalname
                },
                tags: ['test', 'test2'],
                status: true


            });

            file.save((err) => {
                if (err) throw (err);
                console.log(req.files);
                res.status(201).send('Successfully uploaded ' + req.files.length + ' files!')
            })

        }, this);




    });

    app.get('/files/:filter?', function(req, res, next) {
        res.type('json');
        let filter = {};

        try {
            filter = JSON.parse(req.params.filter || "{}");
        } catch (e) {
            res.status(400).send(e);
            return next(new Error(e.message));
        }

        db.files_read(filter, null, null, function(err, filedocs) {
            if (!err) {
                res.status(200).send(JSON.stringify(filedocs));
            } else {
                res.status(400).send("no records found");
            }
        });
    });

    app.delete('/files/:_ids', function(req, res, next) {
        let ids = [];
        try {
            ids = JSON.parse(req.params._ids) || [];
        } catch (e) {
            res.status(400).send(e);
            return next(new Error[e.message]);
        }

        for (let i = 0; i < ids.length; ++i) {
            let filter = { _id: ids[i] };
            db.files_read(filter, null, null, function(err, jsonDoc) {
                if (!err) {
                    jsonDoc.status = "cancelled";
                    db.log_write(jsonDoc);
                }
            });
            db.files_remove(filter, function(err, filedocs) {
                if (!err) {
                    res.status(200).send(JSON.stringify("success"));
                } else {
                    res.status(400).send("no records found");
                }
            });
        }
    });


    /**
     * JWT test
     */
    var jwt = require('express-jwt');
    app.get('/file/secure',
        jwt({ secret: config.app.secret }),
        function(req, res) {
            if (!req.user.admin) return res.sendStatus(401);
            res.sendStatus(200);
        });


    app.get('/file', (req, res) => {

        File.find({}, (err, result) => {

            let data = { data: result };
            res.jsonp(data)
        })
    })

}