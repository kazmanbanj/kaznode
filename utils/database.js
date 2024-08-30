// const Sequelize = require('sequelize');

// const sequelize = new Sequelize('kaznode', 'root', 'root', {
//     dialect: 'mysql',
//     host: 'localhost'
// });

// module.exports = sequelize;

require('dotenv').config();
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
let _db;
const dbUrl = process.env.DB_URL;

if (!dbUrl) {
    throw new Error('Missing required environment variables');
}

const mongoConnect = (callback) => {
    MongoClient.connect(`${dbUrl}`)
    .then(client => {
        console.log('Connected');
        console.log(client);
        _db = client.db();
        callback();
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
};

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found!';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;