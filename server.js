
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var db = ('mongodb://<topogo>:<Topogo1>@ds153699.mlab.com:53699/topogo');

// View Engine
//app.set('views', __dirname + '/views');
//app.set('view engine', 'ejs');
//app.engine('html', require('ejs').renderFile);

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use('/', require('./controllers/register.js'));


// start server
var server = app.listen(3000, function () {
    console.log('Server listening at http://' + server.address().address + ':' + server.address().port);
});
