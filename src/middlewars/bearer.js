'use strict';

const { users } = require('../models/users')

module.exports = async (req, res, next) => {

  // try {

    if (!req.headers.authorization) {  }

    const token = req.headers.authorization.split(' ').pop();
    const validUser = await users.authenticateToken(token);
    req.user = validUser;
    req.token = validUser.token;
    next();

  // } catch (e) {
  //   _authError();
  // }

  // function _authError() {
  //   next('Invalid Login');
  // }
}