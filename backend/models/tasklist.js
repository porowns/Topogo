const mongoose = require('mongoose');
const config = require('../config/database');

// User Schema
const TasklistSchema = mongoose.Schema({
  name: String,
  latitude: Array,
  longitude: Array
});

const Tasklist = module.exports = mongoose.model('Tasklist', TasklistSchema);

module.exports.addTasklist = function(newTasklist, callback){
  newTasklist.save(callback);
}
