const express = require('express');
const path = require('path');
const app = express();

require('dotenv').config();
require('./config/database');

app.use(express.static(path.join(__dirname, 'client', 'build')));
app.use(express.json());

app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/users', require('./routes/api/users'));


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Express from ${port}`);
});