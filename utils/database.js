const Sequelize = require('sequelize');

const sequelize = new Sequelize('kaznode', 'root', 'root', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;
