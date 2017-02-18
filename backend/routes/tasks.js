const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const config = require('../config/database');

// Register
router.post('/createtask', (req, res, next) => {
  let newTask = new Task({
    name: req.body.name,
    creator: req.body.creator,
    latitude: req.body.latitude,
    longitude: req.body.longitude
  });

  Task.addTask(newTask, (err, task) => {
    if(err){
      res.json({success: false, msg:'Failed to create task'});
    } else {
      res.json({success: true, msg:'Task created'});
    }
  });
});


module.exports = router;
