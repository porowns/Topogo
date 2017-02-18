const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const Tasklist = require('./models/tasklist');
var latReplace = [];
var lonReplace = [];
var size = 0;

// Connect To Database
mongoose.connect(config.database);
mongoose.Promise = Promise;

// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database '+config.database);
});

// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+err);
});

const app = express();

const users = require('./routes/users');
const tasks = require('./routes/tasks');
const tasklist = require('./routes/tasklist');

// Port Number
const port = 3000;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// Routes
app.use('/users', users);
app.use('/tasks', tasks);
app.use('/tasklist', tasklist)

app.set('view engine', 'ejs');
// this allows you to render .html files as templates in addition to .ejs
app.engine('html', require('ejs').renderFile);

// Index Route
app.get('/',function(req,res){
  res.render('index.html');
  //res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});



app.get('/map',function(req,res){

  // Extract Database Information
  Tasklist.findOne({ 'name' : "main" }, function(err,tasklist) {
    if(err)
      throw err;
    if(tasklist) {
      var latArray = tasklist.latitude;
      var lonArray = tasklist.longitude;

      latArray.forEach(function(value) {
        console.log("push lat");
        console.log(value);
        latReplace.push(value);
      });

      lonArray.forEach(function(value) {
        console.log("push lon");
        console.log(value);
        lonReplace.push(value);
      });
      //console.log(tasklist.latitude[0]);
      //console.log(tasklist.latitude[1]);
      };

  });

  console.log("pair1");
  console.log(latReplace[0]);
  console.log(lonReplace[0]);
  console.log("pair2");
  console.log(latReplace[4]);
  console.log(lonReplace[4]);

  res.render('map.html',
  {
    lat1: latReplace[0], long1: lonReplace[0],
    lat2: latReplace[1], long2: lonReplace[1],
    lat3: latReplace[2], long3: lonReplace[2],
    lat4: latReplace[3], long4: lonReplace[3],
    lat5: latReplace[4], long5: lonReplace[4]
  });

  //res.sendFile(path.join(__dirname+'/map.html'));
  //__dirname : It will resolve to your p'oject folder.
});

// Start Server
app.listen(port, () => {
  console.log('Server started on port '+port);
});
