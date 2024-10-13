// src/routes/usuarios.js
import express from 'express';
import { DataTypes } from 'sequelize'; // Importando apenas DataTypes
import UsuarioModel from '../models/Usuario.js'; // Importação do modelo Usuario
import conexao from '../conexao.js'; // Importação da conexão

const router = express.Router();

// Inicializando o modelo Usuario com a conexão e DataTypes
const Usuario = UsuarioModel(conexao, DataTypes);

// Rota para criar um novo usuário (POST)
router.post('/', async (req, res) => {
    const { nome, idade, email, senha } = req.body;

    // Validação para garantir que todos os campos necessários estejam presentes
    if (!nome || idade === undefined || !email || !senha) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    try {
        const newUser = { nome, idade, email, senha, data_criacao: new Date() };
        const user = await Usuario.create(newUser);
        res.status(201).json(user);
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).json({ message: 'Erro ao criar usuário', error: error.message });
    }
});

// Rota para listar todos os usuários (GET)
router.get('/', async (req, res) => {
    try {
        const users = await Usuario.findAll(); // Busca todos os usuários do banco de dados
        res.status(200).json(users); // Retorna a lista de usuários
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).json({ message: 'Erro ao buscar usuários', error: error.message });
    }
});

// Rota para atualizar múltiplos usuários (PUT)
router.put('/', async (req, res) => {
    const updatedUsers = req.body; // Espera um array de usuários

    try {
        await Promise.all(updatedUsers.map(async updatedUser => {
            await Usuario.update(
                {
                    nome: updatedUser.nome,
                    email: updatedUser.email,
                    senha: updatedUser.senha,
                    idade: updatedUser.idade // Certifique-se de incluir a idade aqui
                },
                { where: { id_usuario: updatedUser.id_usuario } }
            );
        }));
        res.status(200).json({ message: 'Usuários atualizados com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar usuários:', error);
        res.status(500).json({ message: 'Erro ao atualizar usuários', error: error.message });
    }
});

// Rota para atualizar parcialmente um usuário (PATCH)
router.patch('/:id_usuario', async (req, res) => {
    const { id_usuario } = req.params;

    try {
        const [updated] = await Usuario.update(req.body, { where: { id_usuario } });
        if (updated) {
            const updatedUser = await Usuario.findByPk(id_usuario);
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ message: 'Usuário não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao atualizar parcialmente o usuário:', error);
        res.status(500).json({ message: 'Erro ao atualizar parcialmente o usuário', error: error.message });
    }
});

// Rota para deletar um usuário (DELETE)
router.delete('/:id_usuario', async (req, res) => {
    const { id_usuario } = req.params;

    try {
        const deleted = await Usuario.destroy({ where: { id_usuario } });
        if (deleted) {
            res.status(200).json({ message: 'Usuário deletado com sucesso' });
        } else {
            res.status(404).json({ message: 'Usuário não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao deletar o usuário:', error);
        res.status(500).json({ message: 'Erro ao deletar o usuário', error: error.message });
    }
});

export default router;
