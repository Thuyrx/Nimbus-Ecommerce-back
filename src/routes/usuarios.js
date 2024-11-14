import express from 'express';
import { DataTypes } from 'sequelize';
import UsuarioModel from '../models/Usuario.js'; // Importa o modelo do usuário
import conexao from '../conexao.js'; // Conexão com o banco de dados

const router = express.Router();

// Inicializando o modelo Usuario com a conexão
const Usuario = UsuarioModel(conexao, DataTypes);

// Rota para criar um novo usuário (POST)
router.post('/', async (req, res) => {
    const { nome, idade, email, senha } = req.body;

    // Validação dos campos obrigatórios
    if (!nome || idade === undefined || !email || !senha) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    try {
        // Cria um novo usuário
        const newUser = await Usuario.create({
            nome,
            idade,
            email,
            senha,
            data_criacao: new Date(),
        });

        res.status(201).json(newUser); // Retorna o usuário criado
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).json({ message: 'Erro ao criar usuário', error: error.message });
    }
});

// Rota para listar todos os usuários (GET)
router.get('/', async (req, res) => {
    try {
        const users = await Usuario.findAll(); // Busca todos os usuários
        res.status(200).json(users); // Retorna a lista de usuários
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).json({ message: 'Erro ao buscar usuários', error: error.message });
    }
});

// Rota para atualizar usuários (PUT)
router.put('/', async (req, res) => {
    const updatedUsers = req.body;

    // Validação: verificar se o corpo da requisição é um array ou objeto único
    if (!updatedUsers || (Array.isArray(updatedUsers) && updatedUsers.length === 0)) {
        return res.status(400).json({ message: 'Dados de atualização inválidos.' });
    }

    try {
        if (Array.isArray(updatedUsers)) {
            // Atualizar múltiplos usuários
            await Promise.all(
                updatedUsers.map(async (user) => {
                    if (!user.id_usuario) {
                        throw new Error('ID do usuário é obrigatório para atualização.');
                    }

                    await Usuario.update(
                        {
                            nome: user.nome,
                            email: user.email,
                            senha: user.senha,
                            idade: user.idade,
                        },
                        { where: { id_usuario: user.id_usuario } }
                    );
                })
            );
        } else {
            // Atualizar um único usuário
            const { id_usuario, nome, email, senha, idade } = updatedUsers;
            if (!id_usuario) {
                return res.status(400).json({ message: 'ID do usuário é obrigatório.' });
            }

            await Usuario.update(
                {
                    nome,
                    email,
                    senha,
                    idade,
                },
                { where: { id_usuario } }
            );
        }

        res.status(200).json({ message: 'Usuário(s) atualizado(s) com sucesso.' });
    } catch (error) {
        console.error('Erro ao atualizar usuários:', error);
        res.status(500).json({ message: 'Erro ao atualizar usuários', error: error.message });
    }
});

// Rota para deletar um usuário (DELETE)
router.delete('/:id_usuario', async (req, res) => {
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
