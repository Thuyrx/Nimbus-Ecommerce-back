// src/routes/carrinhos.js
import express from 'express';
import { DataTypes } from 'sequelize';
import CarrinhoModel from '../models/Carrinho.js';
import conexao from '../conexao.js';

const router = express.Router();

// Inicializando o modelo Carrinho com a conexão e DataTypes
const Carrinho = CarrinhoModel(conexao, DataTypes);

// Criar um novo carrinho
router.post('/', async (req, res) => {
    try {
        const { id_usuario } = req.body;
        
        if (!id_usuario) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios." });
        }
        
        const novoCarrinho = await Carrinho.create({ id_usuario });
        return res.status(201).json(novoCarrinho);
    } catch (error) {
        console.error("Erro ao criar carrinho:", error);
        return res.status(500).json({ message: "Erro ao criar carrinho." });
    }
});

// Listar todos os carrinhos
router.get('/', async (req, res) => {
    try {
        const carrinhos = await Carrinho.findAll();
        res.status(200).json(carrinhos);
    } catch (error) {
        console.error('Erro ao buscar carrinhos:', error);
        res.status(500).json({ message: 'Erro ao buscar carrinhos', error: error.message });
    }
});

// Obter um carrinho específico
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

// Atualizar um carrinho existente
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { id_usuario } = req.body;
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

// Deletar um carrinho
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
