const Sequelize = require('sequelize');

const sequelize = new Sequelize("postgres://postgres:EFA2021!@localhost:5432/workout-log");

module.exports = sequelize;