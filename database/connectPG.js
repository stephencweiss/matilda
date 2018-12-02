const { Client } = require('pg');
const config = require('../config.json')

const environment = config.environment

const host = config[environment].db_host;
const user = config[environment].db_username;
const pw = config[environment].db_password;
const db = config[environment].db_database;
const port = config[environment].db_port;
const conString = `postgres://${user}:${pw}@${host}:${port}/${db}`;

const client = new Client({
  connectionString: conString,
});

module.exports = client;

