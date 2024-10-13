// routes/item_pedido.js
import express from 'express';
import { Sequelize, DataTypes } from 'sequelize';
import ItemPedidoModel from '../models/ItemPedido.js'; 
import conexao from '../conexao.js';

const router = express.Router();
const ItemPedido = ItemPedidoModel(conexao, DataTypes);

// Criar novo item no pedido (POST)
router.post('/', async (req, res) => {
  try {
    const { id_pedido, id_produto, quantidade, preco_unitario } = req.body;

    if (!id_pedido || !id_produto || !quantidade || !preco_unitario) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

    const novoItemPedido = await ItemPedido.create({ id_pedido, id_produto, quantidade, preco_unitario });
    res.status(201).json(novoItemPedido);
  } catch (error) {
    console.error('Erro ao criar item do pedido:', error);
    res.status(500).json({ message: 'Erro ao criar item do pedido' });
  }
});

// Listar todos os itens do pedido (GET)
router.get('/', async (req, res) => {
  try {
    const itensPedido = await ItemPedido.findAll();
    res.status(200).json(itensPedido);
  } catch (error) {
    console.error('Erro ao buscar itens do pedido:', error);
    res.status(500).json({ message: 'Erro ao buscar itens do pedido' });
  }
});

// Atualizar um item do pedido (PUT)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await ItemPedido.update(req.body, { where: { id_item_pedido: id } });
    if (updated) {
      const itemAtualizado = await ItemPedido.findByPk(id);
      res.status(200).json(itemAtualizado);
    } else {
      res.status(404).json({ message: 'Item não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao atualizar item do pedido:', error);
    res.status(500).json({ message: 'Erro ao atualizar item do pedido' });
  }
});

// Deletar um item do pedido (DELETE)
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await ItemPedido.destroy({ where: { id_item_pedido: id } });
    if (deleted) {
      res.status(200).json({ message: 'Item deletado com sucesso' });
    } else {
      res.status(404).json({ message: 'Item não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao deletar item do pedido:', error);
    res.status(500).json({ message: 'Erro ao deletar item do pedido' });
  }
});

export default router;
