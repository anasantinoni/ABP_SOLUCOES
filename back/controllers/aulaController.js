const Aula = require('../models/Aula');

exports.getAllAulas = async (req, res) => {
    try {
        const aulas = await Aula.findAll();
        res.status(200).json(aulas);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar aulas' });
    }
};

exports.createAula = async (req, res) => {
    try {
        const aula = await Aula.create(req.body);
        res.status(201).json(aula);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar aula' });
    }
};

