const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Showtime = require('./ShowTime');

const Ticket = sequelize.define('Ticket', {
    seatNumber: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    customerName: { type: DataTypes.STRING, allowNull: false }
});

Ticket.belongsTo(Showtime, { foreignKey: 'showtimeId', onDelete: 'CASCADE' , as: 'showtime' });
Showtime.hasMany(Ticket, { foreignKey: 'showtimeId', as: 'tickets' });

module.exports = Ticket;
