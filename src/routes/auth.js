import express from 'express';
import jwt from 'jsonwebtoken';
import UsuarioModel from '../models/Usuario.js';
import conexao from '../conexao.js';

const router = express.Router();
const SECRET = process.env.JWT_SECRET || 'sua_chave_secreta';

// Inicializando o modelo Usuario com a conexão
const Usuario = UsuarioModel(conexao, DataTypes);

// Rota para login (POST /auth/login)
router.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    try {
        const user = await Usuario.findOne({ where: { email } });

        if (!user || user.senha !== senha) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }

        // Gerar token
        const token = jwt.sign({ id: user.id_usuario }, SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        console.error('Erro ao autenticar usuário:', error);
        res.status(500).json({ message: 'Erro ao autenticar usuário', error: error.message });
    }
});

export default router;
