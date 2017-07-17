module.exports = {
    app: {
        secret: "ITS_MY_SECRET" // used for JWT
    },

    server: {
        default: {
            port: 3333
        }
    },

    storage: {
        use: 's3',
        s3: {
            key_id: '',
            secret: '',
            bucket: 'file-microservice-test'
        },
        local: {
            path: '/../uploads/'
        }
    },

    db: {
        use: 'mongo', // switch dbs for local vs prod

        nedb: {
            filename_prefix: __dirname + "/../data/", // set path and unique prefixes to prevent filename collisions
            autoclean: true, // rewrites and compacts the database
            autoclean_interval: 86400, // 24 hours
        },

        mongo: {
            url: 'mongodb://localhost:27017/filemanager',
            user: '',
            password: '',
            collection: ''
        },

        indexes: {
            files: [
                { fieldName: 'when', unique: false },
                { fieldName: 'status', unique: false, sparse: true },
                { fieldName: 'metadata.hash', unique: true },
                { fieldName: 'metadata.userId', unique: false, sparse: true }
            ]
        }
    }
}
