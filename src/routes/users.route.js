// 'use strict';

// require('dotenv').config();
// const express = require('express');
// const usersRouter = express.Router();
// const { Users } = require('../models/index');
// const base64 = require('base-64');
// const bcrypt = require('bcrypt');
// const basic = require('../middlewars/basicAuth');
// const bearer = require('../middlewars/bearerAuth');

// usersRouter.post('/signup', async (req, res) => {
//     let username = req.body.username;
//     let hashedPassword = await bcrypt.hash(req.body.password, 5);
//     const record = await Users.create({
//         username: username,
//         password: hashedPassword
//     });
//     res.status(201).json(record);
// });

// // usersRouter.get('/signin', async (req, res) => {
// //     // console.log('headers authorization ', req.headers.authorization);
// //     // Basic c2hpaGFiOjEyMw==
// //     if (req.headers.authorization) {
// //         let headersParts = req.headers.authorization.split(" ");// ['Basic','c2hpaGFiOjEyMw==']
// //         let encodedValue = headersParts[1];
// //         let decodedValue = base64.decode(encodedValue);//username:password
// //         let [username, password] = decodedValue.split(":");
// //         const user = await Users.findOne({ where: { username: username } })
// //         const validUser = await bcrypt.compare(password, user.password);
// //         if (validUser) {
// //             res.status(200).json({ user });
// //         } else {
// //             res.status(500).send("wrong username or password");
// //         }

// //     } else {
// //         console.log('no user name or password')
// //     }
// // });
// usersRouter.post('/signin', basic , loginHandler)
// function loginHandler(req, res) {
//     res.status(200).json(req.user);
// }

// usersRouter.get('/users', allUsers);
// async function allUsers(req, res) {
//     let users= await Users.findAll()
//     res.status(200).send(users);
// }



// module.exports = usersRouter;