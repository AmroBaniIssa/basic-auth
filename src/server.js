'use strict';
const express = require("express");
const app = express();
const usersRouter = require('./routes/users.route');
const base64 = require('base-64');
const bcrypt = require('bcrypt');
app.use(express.json());
app.use(usersRouter);



app.get('/', welcomeHandler);
function welcomeHandler(req, res) {
    res.status(200).send('hi user');
}


function start(port) {
    app.listen(port, () => {
        console.log(`server is up and listen on ${port}`)
    });
}
module.exports = {
    start: start,
    app: app,
}