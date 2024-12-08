import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { DataTypes } from 'sequelize';
import UsuarioModel from '../models/Usuario.js';
import conexao from '../conexao.js';
import { autenticarToken } from '../controllers/authMiddleware.js';

const router = express.Router();
const SECRET = 'seu_segredo'; // Coloque uma chave secreta para JWT

// Inicializando o modelo Usuario com a conexão
const Usuario = UsuarioModel(conexao, DataTypes);

// Rota para criar um novo usuário (POST)
router.post('/', async (req, res) => {
    const { nome, idade, email, senha } = req.body;

    if (!nome || idade === undefined || !email || !senha) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(senha, 10); // Hash da senha

        const newUser = await Usuario.create({
            nome,
            idade,
            email,
            senha: hashedPassword, // Salva a senha como hash
            data_criacao: new Date(),
        });

        const userWithoutPassword = { ...newUser.toJSON() };
        delete userWithoutPassword.senha;

        res.status(201).json(userWithoutPassword);
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).json({ message: 'Erro ao criar usuário', error: error.message });
    }
});

// Rota de login (POST)
router.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    try {
        const user = await Usuario.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: 'Usuário não encontrado.' });
        }

        // Verifica a senha com bcrypt
        const isPasswordValid = await bcrypt.compare(senha, user.senha);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Senha incorreta.' });
        }

        // Gera um token JWT
        const token = jwt.sign({ id: user.id_usuario }, SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ message: 'Erro ao fazer login', error: error.message });
    }
});

// Rota protegida para listar todos os usuários (GET)
router.get('/', autenticarToken, async (req, res) => {
    try {
        const users = await Usuario.findAll();
        res.status(200).json(users);
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).json({ message: 'Erro ao buscar usuários', error: error.message });
    }
});

// Rota protegida para atualizar usuários (PUT)
router.put('/', autenticarToken, async (req, res) => {
    const { id_usuario, nome, email, senha, idade } = req.body;

    if (!id_usuario) {
        return res.status(400).json({ message: 'ID do usuário é obrigatório.' });
    }

    try {
        const [updatedRows] = await Usuario.update(
            { nome, email, senha, idade },
            { where: { id_usuario } }
        );

        if (updatedRows === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado para atualização.' });
        }

        res.status(200).json({ message: 'Usuário atualizado com sucesso.' });
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        res.status(500).json({ message: 'Erro ao atualizar usuário', error: error.message });
    }
});

// Rota protegida para deletar usuários (DELETE)
router.delete('/:id_usuario', autenticarToken, async (req, res) => {
    const { id_usuario } = req.params;

    try {
        const deleted = await Usuario.destroy({ where: { id_usuario } });
        if (deleted) {
            res.status(200).json({ message: 'Usuário deletado com sucesso.' });
        } else {
            res.status(404).json({ message: 'Usuário não encontrado.' });
        }
    } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        res.status(500).json({ message: 'Erro ao deletar usuário', error: error.message });
    }
});

export default router;
