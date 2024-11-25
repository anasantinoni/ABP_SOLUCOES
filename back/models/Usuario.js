const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Usuario = db.define('Usuario', {
    id_usuario: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    nome_usu: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    email_usu: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },

    senha_usu: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    celular_usu: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },

    cargo_usu: {
        type: DataTypes.STRING,
        allowNull: false,
    },

}, {
    timestamps: true,
    createdAt: 'data_criacao_usu',
    updatedAt: 'data_atualizacao_usu',
});

module.exports = Usuario;
