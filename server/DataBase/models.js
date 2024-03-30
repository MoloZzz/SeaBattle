const sequelize = require('./initSequelize');

const { DataTypes } = require('sequelize');

const Player = sequelize.define('player', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    role: { type: DataTypes.STRING, defaultValue: "USER" },
    password: { type: DataTypes.STRING, unique: true, allowNull: false },
    games: {type: DataTypes.INTEGER,unique:false, allowNull:true, defaultValue: 0}
});

module.exports = {
    Player
};