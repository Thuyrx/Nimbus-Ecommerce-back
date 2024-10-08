const Sequelize = require('sequelize');

const dbConfig = require("../config/database.js");

const connection = new Sequelize(dbConfig);
try {
    ConnectionAcquireTimeoutError.authenticate();
    console.log('connection established sucessfully');
} catch(error) {
    console.error('unable to connect to the database: ', error);
}
module.exports = connection;