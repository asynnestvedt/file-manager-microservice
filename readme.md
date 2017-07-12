### AWS S3 File Manager Microservice ###

## Design Notes ##
1. microservice uses nedb or mongo for storing file metadata and access permissions.
2. microservice acts as a proxy to AWS s3
3. allows for filetype specific uploads and/or selection
4. Uses jQuery DataTables for displaying file list
5. UI is designed to be a modal with configurable callbacks for easy integration into any app. Currently using bootstrap3 for the UI but will ultimately ditch BS3 and only use jQuery and plugins as dependencies.
6. file duplicates are ignored but new metadata is still created. This means multiple users can "own" and manage a single.  Files are never deleted from AWS S3 but instead their metadata status is set to "deleted". The aws filename is a SHA hash of the file contents. this ensures all file instances are unique.

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
