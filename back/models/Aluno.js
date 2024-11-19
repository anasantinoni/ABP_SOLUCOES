const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Aluno = db.define('Aluno', {
    id_aluno: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome_aluno: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email_aluno: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    data_nascimento: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    cpf_aluno: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
    timestamps: true,
    createdAt: 'data_criacao_aluno',
    updatedAt: 'data_atualizacao_aluno',
});

module.exports = Aluno;
