const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const TaskSchema = mongoose.Schema({
  name: {
    type: String
  },
  creator: {
    type: String,
    required: true
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  }
});

const Task = module.exports = mongoose.model('Task', TaskSchema);

module.exports.addTask = function(newTask, callback){
  newTask.save(callback);
}
