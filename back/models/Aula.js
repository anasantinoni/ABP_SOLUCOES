const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Aula = db.define('Aula', {
    id_aula: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    
    id_aluno: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    
    id_instrutor: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    data_aula: {
        type: DataTypes.DATETIME,
        allowNull: false,
    },

    hora_aula: {
        type: DataTypes.TIME,
        allowNull: false,
    },

    tipo_aula: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    status_aula: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    motivo_cancelamento: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    placa_carro: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },

}, {
    timestamps: true,
    createdAt: 'data_criacao_aula',
    updatedAt: 'data_atualizacao_aula',
});

module.exports = Aula;
