const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Studio = sequelize.define('Studio', {
    name: { type: DataTypes.STRING, allowNull: false },
    location: { type: DataTypes.STRING }
});

module.exports = Studio;
