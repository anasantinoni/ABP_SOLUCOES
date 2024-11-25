const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Financeiro = db.define('Financeiro', {
    id_parcela: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    id_aluno: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    valor: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },

    data_vencimento: {
        type: DataTypes.DATETIME,
        allowNull: false,
    },

    data_pagamento: {
        type: DataTypes.DATETIME,
        allowNull: false,
    },

    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    valor_multa: {
        type: DataTypes.DECIMAL,
        allowNull: true,
    },

    valor_desconto: {
        type: DataTypes.DECIMAL,
        allowNull: true,
    },

    tipo_pagamento: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },

}, {
    timestamps: true,
    createdAt: 'data_criacao',
    updatedAt: 'data_atualizacao',
});

module.exports = Financeiro;
