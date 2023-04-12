const Sequelize = require('sequelize');
const dbConnection = require('./config.json').development
let dBUser =  dbConnection.username
let dbPassword = dbConnection.password
let dbName = dbConnection.database
//let dbHost = process.env.PGHOST // dbConnection.host
let dbHost = "localhost"
let dbPort = dbConnection.port
let dbDialect = dbConnection.dialect

const connectionString = `${dbDialect}://${dBUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`
const sequelize = new Sequelize(connectionString);
module.exports = sequelize
