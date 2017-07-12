### AWS S3 File Manager Microservice ###

## Design Notes ##
1. microservice uses nedb or mongo for storing file metadata and access permissions.
2. microservice acts as a proxy to AWS s3
3. allows for filetype specific uploads and/or selection
4. Uses jQuery DataTables for displaying file list

### Configuration ###
edit `config/config.js` to set custom port, indexes, filenames and running intervals.

### Running ###
    npm install
    npm start
    
API info

> http://localhost:3333

    Method	Path
    GET     /
    POST    /files
    GET     /files/:filter?
    DELETE  /files/:_ids
    
**filter** parameter is an optional json that maps to a mongo query and must use strings for attribute names such as ` /files/{"type":"emailer"} `

**_id** parameter is a json array of file ids e.g. ` /files/["2ijYWJ7LiA1BrqlS","WNxlBzgW36gczRBV"] `


### Anatomy ###

>/cache - is used as a file cache when proxying AWS.
>/config - app settings
>/data - local nedb database files
>/upload - file system upload location. this is where uploads go before they are processed and stored in AWS
