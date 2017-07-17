
/**
 * returns a resource (i.e. a file)
 */
module.exports = function(app, db) {
    app.get('/res/:id?', function (req, res, next) {
        // 1. query mongo for file metadata (USE NATIVE MONGO DB DRIVER FOR THIS QUERY)

        // 2. check read permissions

        // 3. if user is allowed to read then check local cache for the file.

        // 4. if not in local cache get the file from s3 and cache in local filesystem

        // 5. return file
        res.type('get-mime-type');
        res.status(200).send(JSON.stringify(filedocs));
    });
};