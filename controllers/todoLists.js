const TodoList = require('../models/todoList');

async function index(req, res) {
  try { 
    let todoLists =  await TodoList.find();
    res.json({ todoLists });
  } catch(err){
    res.status(500).send('Mongoose encountered an error finding all todoLists');
  }
};

async function show(req, res) {
  try {
    let todoList = await TodoList.findById(req.params.id);
    res.json({ todoList });
  } catch(err){
    res.status(500).send('Mongoose encountered an error finding todoList');
  }
};

async function create(req, res) {
  let errors = []
  if(!req.body.todoListInfo)
    errors.push('request body must contain todoListInfo');
  else if(!req.body.todoListInfo.name)
    errors.push('request body must contain todoListInfo.name');
  if (errors.length !== 0)
    return res.status(400).send('Bad Request\n' + errors.join('\n'));

  let todoList = new TodoList(req.body.todoListInfo);
  todoList.users.push(req.user._id);
  
  try{
    await todoList.save();
    res.json({ todoList });
  }catch(err){
    res.status(500).send('Mongoose encountred an error while creating a new todoList');
  }
}


module.exports = {
  index,
  show,
  create
};