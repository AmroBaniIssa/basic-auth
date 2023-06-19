const express = require('express');
const usersRouter = express.Router();
const { UserModel } = require('../models/index');
const base64 = require('base-64');
const bcrypt = require('bcrypt');

usersRouter.post('/signup', async (req, res) => {
    let username = req.body.username;
    let hashedPassword = await bcrypt.hash(req.body.password, 5);
    const record = await UserModel.create({
        username: username,
        password: hashedPassword
    });
    res.status(201).json(record);
});

usersRouter.get('/signin', async (req, res) => {
    // console.log('headers authorization ', req.headers.authorization);
    // Basic c2hpaGFiOjEyMw==
    if (req.headers.authorization) {
        let headersParts = req.headers.authorization.split(" ");// ['Basic','c2hpaGFiOjEyMw==']
        // let encodedValue = headersParts[1];
        let encodedValue = headersParts.pop();
        let decodedValue = base64.decode(encodedValue);//username:password
        let [username, password] = decodedValue.split(":");
        const user = await UserModel.findOne({ where: { username: username } })
        // console.log('user from DB ', user);
        const validUser = await bcrypt.compare(password, user.password);
        if (validUser) {
            res.status(200).json({ user });
        } else {
            res.status(500).send("wrong username or password");
        }

    } else {
        console.log('no user name or password')
    }
});



module.exports = usersRouter;