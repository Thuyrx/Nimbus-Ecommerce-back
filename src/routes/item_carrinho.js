import express from 'express';
import { Sequelize, DataTypes } from 'sequelize';
import ItemCarrinhoModel from '../models/ItemCarrinho.js'; // Importa o modelo ItemCarrinho
import conexao from '../conexao.js'; // Conexão com o banco de dados

const router = express.Router();
const ItemCarrinho = ItemCarrinhoModel(conexao, DataTypes);

// Criar novo item no carrinho (POST)
router.post('/', async (req, res) => {
    try {
        const { id_carrinho, id_produto, quantidade } = req.body;

        // Validação dos campos obrigatórios
        if (!id_carrinho || !id_produto || !quantidade) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios." });
        }

        const novoItem = await ItemCarrinho.create({ id_carrinho, id_produto, quantidade });
        res.status(201).json(novoItem); // Retorna o item criado
    } catch (error) {
        console.error('Erro ao criar item do carrinho:', error);
        res.status(500).json({ message: 'Erro ao criar item do carrinho' });
    }
});

// Listar todos os itens do carrinho (GET)
router.get('/', async (req, res) => {
    try {
        const itens = await ItemCarrinho.findAll(); // Busca todos os itens do carrinho
        res.status(200).json(itens);
    } catch (error) {
        console.error('Erro ao buscar itens do carrinho:', error);
        res.status(500).json({ message: 'Erro ao buscar itens do carrinho' });
    }
});

// Obter um item específico do carrinho (GET)
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const item = await ItemCarrinho.findByPk(id);
        if (item) {
            res.status(200).json(item);
        } else {
            res.status(404).json({ message: 'Item não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao buscar item do carrinho:', error);
        res.status(500).json({ message: 'Erro ao buscar item do carrinho' });
    }
});

// Atualizar um item no carrinho (PUT)
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [updated] = await ItemCarrinho.update(req.body, { where: { id_item: id } });
        if (updated) {
            const itemAtualizado = await ItemCarrinho.findByPk(id);
            res.status(200).json(itemAtualizado); // Retorna o item atualizado
        } else {
            res.status(404).json({ message: 'Item não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao atualizar item do carrinho:', error);
        res.status(500).json({ message: 'Erro ao atualizar item do carrinho' });
    }
});

// Atualizar parcialmente um item no carrinho (PATCH)
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const item = await ItemCarrinho.findByPk(id);
        if (item) {
            await item.update(req.body);
            res.status(200).json(item);
        } else {
            res.status(404).json({ message: 'Item não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao atualizar item do carrinho:', error);
        res.status(500).json({ message: 'Erro ao atualizar item do carrinho' });
    }
});

// Deletar um item do carrinho baseado no id_item (DELETE)
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await ItemCarrinho.destroy({ where: { id_item: id } });
        if (deleted) {
            res.status(200).json({ message: 'Item deletado com sucesso' });
        } else {
            res.status(404).json({ message: 'Item não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao deletar item do carrinho:', error);
        res.status(500).json({ message: 'Erro ao deletar item do carrinho' });
    }
});

// Deletar um item do carrinho baseado no id_produto (DELETE)
router.delete('/remover/:id_produto', async (req, res) => {
    const { id_produto } = req.params;
    try {
        // Remover o item do carrinho com base no id_produto
        const deleted = await ItemCarrinho.destroy({ where: { id_produto } });

        if (deleted) {
            res.status(200).json({ message: 'Produto removido com sucesso do carrinho' });
        } else {
            res.status(404).json({ message: 'Produto não encontrado no carrinho' });
        }
    } catch (error) {
        console.error('Erro ao remover o item do carrinho:', error);
        res.status(500).json({ message: 'Erro ao remover o item do carrinho', error: error.message });
    }
});

export default router;
