// src/routes/carrinhos.js
import express from 'express';
import { Sequelize, DataTypes } from 'sequelize'; // Certifique-se de que o Sequelize e DataTypes estão disponíveis
import CarrinhoModel from '../models/Carrinho.js'; // Importa o modelo Carrinho
import conexao from '../conexao.js'; // Importa a conexão

const router = express.Router();

// Inicializando o modelo Carrinho com a conexão e DataTypes
const Carrinho = CarrinhoModel(conexao, DataTypes);

// Criar um novo carrinho
router.post('/', async (req, res) => {
    try {
        const { id_usuario } = req.body; // Extrai o id_usuario do corpo da requisição
        
        // Valida se id_usuario foi enviado
        if (!id_usuario) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios." });
        }
        
        // Cria o novo carrinho
        const novoCarrinho = await Carrinho.create({ id_usuario });
        return res.status(201).json(novoCarrinho); // Retorna o novo carrinho criado
    } catch (error) {
        console.error("Erro ao criar carrinho:", error);
        return res.status(500).json({ message: "Erro ao criar carrinho." });
    }
});

// Rota para listar todos os carrinhos (GET)
router.get('/', async (req, res) => {
    try {
        const carrinhos = await Carrinho.findAll(); // Busca todos os carrinhos do banco de dados
        res.status(200).json(carrinhos); // Retorna a lista de carrinhos
    } catch (error) {
        console.error('Erro ao buscar carrinhos:', error);
        res.status(500).json({ message: 'Erro ao buscar carrinhos', error: error.message });
    }
});

// Rota para obter um carrinho específico (GET)
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const carrinho = await Carrinho.findByPk(id);
        if (carrinho) {
            res.status(200).json(carrinho);
        } else {
            res.status(404).json({ message: 'Carrinho não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao buscar carrinho:', error);
        res.status(500).json({ message: 'Erro ao buscar carrinho', error: error.message });
    }
});

// Rota para atualizar um carrinho existente (PUT)
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { id_usuario } = req.body; // Pode incluir mais campos se necessário
    try {
        const [updated] = await Carrinho.update({ id_usuario }, { where: { id_carrinho: id } });
        if (updated) {
            const updatedCarrinho = await Carrinho.findByPk(id);
            res.status(200).json(updatedCarrinho);
        } else {
            res.status(404).json({ message: 'Carrinho não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao atualizar carrinho:', error);
        res.status(500).json({ message: 'Erro ao atualizar carrinho', error: error.message });
    }
});

// Rota para atualizar parcialmente um carrinho (PATCH)
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const carrinho = await Carrinho.findByPk(id);
        if (carrinho) {
            await carrinho.update(req.body); // Atualiza apenas os campos que foram passados
            res.status(200).json(carrinho);
        } else {
            res.status(404).json({ message: 'Carrinho não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao atualizar carrinho:', error);
        res.status(500).json({ message: 'Erro ao atualizar carrinho', error: error.message });
    }
});

// Rota para deletar um carrinho (DELETE)
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Carrinho.destroy({ where: { id_carrinho: id } });
        if (deleted) {
            res.status(200).json({ message: 'Carrinho deletado com sucesso' });
        } else {
            res.status(404).json({ message: 'Carrinho não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao deletar carrinho:', error);
        res.status(500).json({ message: 'Erro ao deletar carrinho', error: error.message });
    }
});

export default router;
