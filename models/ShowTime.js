const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Film = require('./Film');

const Showtime = sequelize.define('Showtime', {
    time: { type: DataTypes.DATE, allowNull: false }
});

Showtime.belongsTo(Film, { foreignKey: 'filmId', onDelete: 'CASCADE', as: 'film' });
Film.hasMany(Showtime, { foreignKey: 'filmId', as: 'showtimes' });

module.exports = Showtime;
