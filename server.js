const express = require('express');
const path = require('path');
const app = express();

require('dotenv').config();
require('./config/database');

app.use(express.static(path.join(__dirname, 'client', 'build')));
app.use(express.json());

app.use('/api/v1/auth', require('./routes/api/auth'));
app.use('/api/v1/users', require('./routes/api/users'));
app.use('/api/v1/todolists', require('./routes/api/todoLists'));
app.use('/api/v1/todos', require('./routes/api/todos'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Express from ${port}`);
});