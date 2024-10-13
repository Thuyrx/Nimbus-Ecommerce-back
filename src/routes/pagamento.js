import express from 'express';
import { Sequelize, DataTypes } from 'sequelize';
import PagamentoModel from '../models/Pagamento.js'; // Importa o modelo Pagamento
import conexao from '../conexao.js'; // Conexão com o banco de dados

const router = express.Router();
const Pagamento = PagamentoModel(conexao, DataTypes);

// Criar novo pagamento (POST)
router.post('/', async (req, res) => {
  try {
    const { id_pedido, valor, metodo_pagamento, status_pagamento } = req.body;

    // Validação dos campos obrigatórios
    if (!id_pedido || !valor || !metodo_pagamento || !status_pagamento) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

    const novoPagamento = await Pagamento.create({ id_pedido, valor, metodo_pagamento, status_pagamento });
    res.status(201).json(novoPagamento);
  } catch (error) {
    console.error('Erro ao criar pagamento:', error);
    res.status(500).json({ message: 'Erro ao criar pagamento' });
  }
});

// Listar todos os pagamentos (GET)
router.get('/', async (req, res) => {
  try {
    const pagamentos = await Pagamento.findAll();
    res.status(200).json(pagamentos);
  } catch (error) {
    console.error('Erro ao buscar pagamentos:', error);
    res.status(500).json({ message: 'Erro ao buscar pagamentos' });
  }
});

// Atualizar um pagamento (PUT)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await Pagamento.update(req.body, { where: { id_pagamento: id } });
    if (updated) {
      const pagamentoAtualizado = await Pagamento.findByPk(id);
      res.status(200).json(pagamentoAtualizado);
    } else {
      res.status(404).json({ message: 'Pagamento não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao atualizar pagamento:', error);
    res.status(500).json({ message: 'Erro ao atualizar pagamento' });
  }
});

// Atualizar parcialmente um pagamento (PATCH)
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const pagamento = await Pagamento.findByPk(id);
    if (pagamento) {
      await pagamento.update(req.body);
      res.status(200).json(pagamento);
    } else {
      res.status(404).json({ message: 'Pagamento não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao atualizar pagamento:', error);
    res.status(500).json({ message: 'Erro ao atualizar pagamento' });
  }
});

// Deletar um pagamento (DELETE)
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Pagamento.destroy({ where: { id_pagamento: id } });
    if (deleted) {
      res.status(200).json({ message: 'Pagamento deletado com sucesso' });
    } else {
      res.status(404).json({ message: 'Pagamento não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao deletar pagamento:', error);
    res.status(500).json({ message: 'Erro ao deletar pagamento' });
  }
});

export default router;
