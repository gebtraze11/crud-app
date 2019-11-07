const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  text: String,
  completed: {
    type: Boolean,
    default: false
  },
});

const todoListSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  todos:[todoSchema],
  users:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});

module.exports = mongoose.model('TodoList', todoListSchema);


