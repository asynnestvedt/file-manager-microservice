let config = require('./config/config.js'),
    db = new(require('./lib/db-mgr.js')),
    express = require('express'),
    bodyparser = require('body-parser'),
    path = require('path');

let app = express();

app.use(express.static(path.join(__dirname, 'public/')));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

/**
 * display API info at root URL
 */
app.get('/', function(req, res) {
    // res.sendFile(path.join(__dirname, './public', 'bootstrap.html'));
    res.sendFile(path.join(__dirname, './public', 'index.html'));
})

/**
 * loads broken out routes
 */
require('./routes')(app, db);

/**
 * Start HTTP Server
 * port config can be overridden using environment var
 */
let port = process.env.PORT || config.server.default.port;
app.listen(port, function() {
    console.log('Express app listening on port ' + port)
})