const Financeiro = require('../models/Financeiro');

exports.getAllContas = async (req, res) => {
    try {
        const contas = await Financeiro.findAll();
        res.status(200).json(contas);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar contas' });
    }
};

exports.createConta = async (req, res) => {
    try {
        const conta = await Financeiro.create(req.body);
        res.status(201).json(conta);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar conta' });
    }
};

