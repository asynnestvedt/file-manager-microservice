let config = require('../config/config.js');
let DbMgr = require('../lib/db-mgr.js');
let Job = require('../lib/job.js');
let express = require('express');
let app = express();

let db = new DbMgr();

let plus10min = Math.round(((new Date()).getTime() / 1000)) + 600;


// 1. if test file exists, delete using admin priviledges

// 2. write test file with various permissions

// 3. query test file

// 4. return status
