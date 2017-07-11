let config = require('../config/config');

module.exports = class DbMgr {
    constructor() {

        if (config.db.use === 'nedb') {
            let Datastore = require('nedb');
            this.files = { meta: (config.db.filename_prefix || '') + 'files-meta.data.nedb' }
            this.db = { meta: new Datastore({ filename: this.files.meta, autoload: true, timestampData: true }) };
        } else {
            //default to mongo
            var MongoClient = require('mongodb').MongoClient
                , assert = require('assert');

            // Use connect method to connect to the server
            MongoClient.connect(config.db.mongo.url, function (err, db) {
                assert.equal(null, err);
                console.log("Connected successfully to server");

                db.close();
            });
        }


        /**
         * apply indexes from config file
         */
        for(let i in config.db.indexes.meta) {
            this.db.meta.ensureIndex(config.db.indexes.meta[i], function (err) {
                if (err) console.log('indexing failed. data may be corrupt');
            });
        }
    }

    /**
     * this will cause nedb to compact the db
     */
    clean (dbname) {
        this.db[dbname].loadDatabase();
    }

    /**
     * schedule or update a single file
     * update occurs if _id attribute is present
     * @param {Object} doc - json from file model 
     * @param {Object} cb 
     */
    meta_write(doc, cb) {
        if (! doc)
            cb("no data provided", null);
        
        // do update if id exists
        if (doc._id) {
            this.db.meta.update({_id: doc._id}, doc, function (err, newDoc) {
                if(cb && typeof cb == "function") {
                    cb(err, newDoc);
                }
            });
        }
        // or do insert 
        else {
            this.db.meta.insert(doc, function (err, newDoc) {
                if(cb && typeof cb == "function") {
                    cb(err, newDoc);
                }
            });
        }
    }

    /**
     * get file documents
     * @param {Object} query - json object containing filters
     * @param {Object} sort 
     * @param {Number} limit 
     * @param {Object} cb 
     */
    meta_read(query, sort, limit, cb) {
        sort = sort || {createdAt: -1}; // default to reverse chronological order
        
        this.db.meta.find(query).sort(sort).limit(limit).exec(function(err, docs) {
            if(cb && typeof cb == "function")
                cb(err, docs);
        });
    }

    /**
     * "remove" one file by setting status = "deleted"
     * @param {String} doc_id 
     * @param {Object} cb 
     */
    meta_remove(doc_id, cb) {
        if (! doc_id)
            cb("no data provided", null);

        this.db.meta.update({_id: doc._id}, {$set: {status: "deleted"}}, function (err, newDoc) {
            if(cb && typeof cb == "function") {
                cb(err, newDoc);
            }
        });
    }

}
