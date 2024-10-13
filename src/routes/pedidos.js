import express from 'express';
import { Sequelize, DataTypes } from 'sequelize';
import PedidoModel from '../models/Pedido.js';
import conexao from '../conexao.js';

const router = express.Router();
const Pedido = PedidoModel(conexao, DataTypes);

// Criar um novo pedido (POST)
router.post('/', async (req, res) => {
    try {
        const { id_usuario, data_pedido, status, total } = req.body;

        if (!id_usuario || !status || total === undefined) {
            return res.status(400).json({ message: "Os campos id_usuario, status e total são obrigatórios." });
        }

        const novoPedido = await Pedido.create({ id_usuario, data_pedido, status, total });
        res.status(201).json(novoPedido);
    } catch (error) {
        console.error('Erro ao criar pedido:', error);
        res.status(500).json({ message: 'Erro ao criar pedido.' });
    }
});

// Listar todos os pedidos (GET)
router.get('/', async (req, res) => {
    try {
        const pedidos = await Pedido.findAll();
        res.status(200).json(pedidos);
    } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
        res.status(500).json({ message: 'Erro ao buscar pedidos.' });
    }
});

// Atualizar um pedido (PUT)
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [updated] = await Pedido.update(req.body, { where: { id_pedido: id } });
        if (updated) {
            const pedidoAtualizado = await Pedido.findByPk(id);
            res.status(200).json(pedidoAtualizado);
        } else {
            res.status(404).json({ message: 'Pedido não encontrado.' });
        }
    } catch (error) {
        console.error('Erro ao atualizar pedido:', error);
        res.status(500).json({ message: 'Erro ao atualizar pedido.' });
    }
});

// Atualizar parcialmente um pedido (PATCH)
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const pedido = await Pedido.findByPk(id);
        if (pedido) {
            await pedido.update(req.body);
            res.status(200).json(pedido);
        } else {
            res.status(404).json({ message: 'Pedido não encontrado.' });
        }
    } catch (error) {
        console.error('Erro ao atualizar pedido:', error);
        res.status(500).json({ message: 'Erro ao atualizar pedido.' });
    }
});

// Deletar um pedido (DELETE)
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Pedido.destroy({ where: { id_pedido: id } });
        if (deleted) {
            res.status(200).json({ message: 'Pedido deletado com sucesso.' });
        } else {
            res.status(404).json({ message: 'Pedido não encontrado.' });
        }
    } catch (error) {
        console.error('Erro ao deletar pedido:', error);
        res.status(500).json({ message: 'Erro ao deletar pedido.' });
    }
});

export default router;
