import express from 'express';
import { DataTypes } from 'sequelize';
import UsuarioModel from '../models/Usuario.js'; // Modelo do usuário
import conexao from '../conexao.js'; // Conexão com o banco
import { autenticarToken } from '../controllers/authMiddleware.js'; // Middleware de autenticação

const router = express.Router();

// Inicializando o modelo Usuario com a conexão
const Usuario = UsuarioModel(conexao, DataTypes);

// Rota para criar um novo usuário (POST)
router.post('/', async (req, res) => {
    const { nome, idade, email, senha } = req.body;

    if (!nome || idade === undefined || !email || !senha) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    try {
        const newUser = await Usuario.create({
            nome,
            idade,
            email,
            senha,
            data_criacao: new Date(),
        });

        res.status(201).json(newUser);
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).json({ message: 'Erro ao criar usuário', error: error.message });
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
