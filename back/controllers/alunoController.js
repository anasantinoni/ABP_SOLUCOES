const Aluno = require('../models/Aluno');

exports.getAllAlunos = async (req, res) => {
    try {
        const alunos = await Aluno.findAll();
        res.status(200).json(alunos);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar alunos' });
    }
};

exports.createAluno = async (req, res) => {
    try {
        const aluno = await Aluno.create(req.body);
        res.status(201).json(aluno);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar aluno' });
    }
};

