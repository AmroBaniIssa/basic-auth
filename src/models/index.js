'use strict';
require('dotenv').config();
const { Sequelize, DataTypes } = require("sequelize");
const users = require('./users.model');
const Collection = require('./lib/collection');

const POSTGRES_URI = process.env.NODE_ENV === "test" ? "sqlite::memory:" : process.env.DATABASE_URL;

let sequelizeOptions = process.env.NODE_ENV === "production" ?
    {
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
    } :
    {}

let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);
// let sequelize = new Sequelize(POSTGRES_URI, {});//if we don't have production or testing we can send {}



module.exports = {
    db: sequelize,
    Users: users(sequelize, DataTypes),
  }