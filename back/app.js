const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const alunoRoutes = require('./routes/alunoRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const financeiroRoutes = require('./routes/financeiroRoutes');
const aulaRoutes = require('./routes/aulaRoutes');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/alunos', alunoRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/financeiro', financeiroRoutes);
app.use('/api/aulas', aulaRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
