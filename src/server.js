import express from 'express';
import Usuario from './models/Usuario.js'; // Importação corrigida
import conexao from '../conexao.js'; // Importação corrigida

const app = express();
app.use(express.json());

// Criar um novo usuário (POST)
app.post('/usuarios', async (req, res) => {
    try {
        const newUser = await Usuario.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar usuário', error });
    }
});

// Listar todos os usuários (GET)
app.get('/usuarios', async (req, res) => {
    try {
        const users = await Usuario.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar usuários', error });
    }
});

// Atualizar múltiplos usuários (PUT)
app.put('/usuarios', async (req, res) => {
    try {
        const updatedUsers = req.body;
        await Promise.all(updatedUsers.map(async updatedUser => {
            await Usuario.update(updatedUser, { where: { id: updatedUser.id } });
        }));
        res.status(200).json({ message: 'Usuários atualizados com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar usuários', error });
    }
});

// Atualizar parcialmente um usuário (PATCH)
app.patch('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [updated] = await Usuario.update(req.body, { where: { id } });
        if (updated) {
            const updatedUser = await Usuario.findByPk(id);
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ message: 'Usuário não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar usuário', error });
    }
});

// Deletar um usuário (DELETE)
app.delete('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Usuario.destroy({ where: { id } });
        if (deleted) {
            res.status(200).json({ message: 'Usuário deletado com sucesso' });
        } else {
            res.status(404).json({ message: 'Usuário não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar usuário', error });
    }
});

// Estabelecer a conexão com o banco de dados antes de iniciar o servidor
conexao.authenticate()
    .then(() => {
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
        app.listen(3000, () => {
            console.log('Servidor rodando na porta 3000');
        });
    })
    .catch((error) => {
        console.error('Não foi possível conectar ao banco de dados:', error);
    });
