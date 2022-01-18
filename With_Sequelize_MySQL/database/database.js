const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('shopify_customsessionstorage_sequelize', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;