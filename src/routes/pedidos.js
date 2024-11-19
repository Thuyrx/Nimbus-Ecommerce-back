import express from 'express';
import { Sequelize, DataTypes } from 'sequelize';
import PedidoModel from '../models/Pedido.js';
import conexao from '../conexao.js';

const router = express.Router();
const Pedido = PedidoModel(conexao, DataTypes);

// **Criar um novo pedido (POST)**
router.post('/', async (req, res) => {
    try {
        const { id_usuario, data_pedido, status, total } = req.body;

        // Validação dos campos obrigatórios
        if (!id_usuario || !status || total === undefined) {
            return res.status(400).json({ message: "Os campos id_usuario, status e total são obrigatórios." });
        }

        // Cria o pedido no banco de dados
        const novoPedido = await Pedido.create({ id_usuario, data_pedido, status, total });
        return res.status(201).json(novoPedido);
    } catch (error) {
        console.error('Erro ao criar pedido:', error);
        return res.status(500).json({ message: 'Erro ao criar pedido.', error: error.message });
    }
});

// **Listar todos os pedidos (GET)**
router.get('/', async (req, res) => {
    try {
        const pedidos = await Pedido.findAll();
        return res.status(200).json(pedidos);
    } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
        return res.status(500).json({ message: 'Erro ao buscar pedidos.', error: error.message });
    }
});

// **Obter um pedido específico (GET)**
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const pedido = await Pedido.findByPk(id);
        if (pedido) {
            return res.status(200).json(pedido);
        } else {
            return res.status(404).json({ message: 'Pedido não encontrado.' });
        }
    } catch (error) {
        console.error('Erro ao buscar pedido:', error);
        return res.status(500).json({ message: 'Erro ao buscar pedido.', error: error.message });
    }
});

// **Atualizar um pedido completamente (PUT)**
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { id_usuario, data_pedido, status, total } = req.body;

    try {
        const [updated] = await Pedido.update({ id_usuario, data_pedido, status, total }, { where: { id_pedido: id } });
        if (updated) {
            const pedidoAtualizado = await Pedido.findByPk(id);
            return res.status(200).json(pedidoAtualizado);
        } else {
            return res.status(404).json({ message: 'Pedido não encontrado.' });
        }
    } catch (error) {
        console.error('Erro ao atualizar pedido:', error);
        return res.status(500).json({ message: 'Erro ao atualizar pedido.', error: error.message });
    }
});

// **Atualizar parcialmente um pedido (PATCH)**
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const pedido = await Pedido.findByPk(id);
        if (pedido) {
            await pedido.update(req.body); // Atualiza apenas os campos enviados
            return res.status(200).json(pedido);
        } else {
            return res.status(404).json({ message: 'Pedido não encontrado.' });
        }
    } catch (error) {
        console.error('Erro ao atualizar pedido:', error);
        return res.status(500).json({ message: 'Erro ao atualizar pedido.', error: error.message });
    }
});

// **Deletar um pedido (DELETE)**
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Pedido.destroy({ where: { id_pedido: id } });
        if (deleted) {
            return res.status(200).json({ message: 'Pedido deletado com sucesso.' });
        } else {
            return res.status(404).json({ message: 'Pedido não encontrado.' });
        }
    } catch (error) {
        console.error('Erro ao deletar pedido:', error);
        return res.status(500).json({ message: 'Erro ao deletar pedido.', error: error.message });
    }
});

export default router;
