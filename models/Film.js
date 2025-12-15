const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const Studio = require("./Studio");

const Film = sequelize.define("Film", {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  duration: { type: DataTypes.INTEGER, allowNull: false },
});

Film.belongsTo(Studio, {
  foreignKey: "studioId",
  onDelete: "CASCADE",
  as: "studio",
});
Studio.hasMany(Film, { foreignKey: "studioId", as: "films" });

module.exports = Film;
