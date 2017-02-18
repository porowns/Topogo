const express = require('express');
const router = express.Router();
const Tasklist = require('../models/tasklist');
const config = require('../config/database');

// Register
router.post('/updatetasks', (req, res, next) => {

  Tasklist.findOne({ 'name' : "main" }, function(err,tasklist) {
    if(err)
      throw err;
    if(!tasklist) {
      let newTasklist = new Tasklist({
        name: "main",
      });

      Tasklist.addTasklist(newTasklist, (err, tasklist) => {
      });
    }
  });

  Tasklist.update({ 'name' : "main"}, { $push: {'latitude': req.body.latitude} }, function(err) {
    if(err)
      throw err;
  });

  Tasklist.update({ 'name' : "main"}, { $push: {'longitude': req.body.longitude} }, function(err) {
    if(err)
      throw err;

    res.json({
      success: true,
      msg: 'Updated...'
    });
  });
});


module.exports = router;
