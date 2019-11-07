const TodoList = require('../models/todoList');

async function create(req, res){
  let errors = [];
  if(!req.query.todoList_id)
    errors.push('request body requires todoList_id');
  if(!req.body.todoInfo) {
    errors.push('request body requires todoInfo');
  } else  if(!req.body.todoInfo.name) {
    errors.push('request body requires todoInfo.name');
  }
  
  if(errors.length > 0)
    return res.status(400).send('Bad Request\n' + errors.join('/n'));
  
  try {
    let todoList = await TodoList.findById(req.query.todoList_id);
    let userAccess = todoList.users.includes(req.user._id);
    if(!userAccess)
      return res.status(400).send('not authorized');

    todoList.todos.push(req.body.todoInfo);
    await todoList.save();
    let todo = todoList.todos[todoList.todos.length-1];
    res.json({ todo });
  } catch(err) {
    console.log(err);
    res.status(500).send('mongoose encountered an error while finding a todoList');
  }
}

function show(req, res){

}

function update(req, res){

}

module.exports = {
  create
}