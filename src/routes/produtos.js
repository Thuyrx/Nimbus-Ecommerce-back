// src/routes/produtos.js
import express from 'express';
import { Sequelize, DataTypes } from 'sequelize'; // Importando Sequelize e DataTypes
import ProdutoModel from '../models/Produto.js'; // Importação do modelo Produto
import conexao from '../conexao.js'; // Importação da conexão

const router = express.Router();

// Inicializando o modelo Produto com a conexão e DataTypes
const Produto = ProdutoModel(conexao, DataTypes); // Aqui você passa a conexão e os DataTypes

router.post('/', async (req, res) => {
    try {
        const { nome, descricao, preco, estoque, categoria, imagem_url } = req.body;

        // Validação para garantir que todos os campos necessários estejam presentes
        if (!nome || !descricao || preco === undefined || estoque === undefined || !categoria) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
        }

        const newProduct = { nome, descricao, preco, estoque, categoria, imagem_url };
        const product = await Produto.create(newProduct);
        res.status(201).json(product);
    } catch (error) {
        console.error('Erro ao criar produto:', error);
        res.status(500).json({ message: 'Erro ao criar produto', error: error.message });
    }
});


// Rota para listar todos os produtos (GET)
router.get('/', async (req, res) => {
    try {
        const products = await Produto.findAll(); // Busca todos os produtos do banco de dados
        res.status(200).json(products); // Retorna a lista de produtos
    } catch (error) {
        console.error('Erro ao buscar produtos:', error); // Log do erro
        res.status(500).json({ message: 'Erro ao buscar produtos', error: error.message });
    }
});

// Rota para atualizar um produto (PUT)
router.put('/:id_produto', async (req, res) => {
    const { id_produto } = req.params;
    try {
        const [updated] = await Produto.update(req.body, { where: { id_produto } });
        if (updated) {
            const updatedProduct = await Produto.findByPk(id_produto);
            res.status(200).json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Produto não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao atualizar produto:', error);
        res.status(500).json({ message: 'Erro ao atualizar produto', error: error.message });
    }
});

// Rota para deletar um produto (DELETE)
router.delete('/:id_produto', async (req, res) => {
    const { id_produto } = req.params;
    try {
        const deleted = await Produto.destroy({ where: { id_produto } });
        if (deleted) {
            res.status(200).json({ message: 'Produto deletado com sucesso' });
        } else {
            res.status(404).json({ message: 'Produto não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao deletar o produto:', error);
        res.status(500).json({ message: 'Erro ao deletar o produto', error: error.message });
    }
});

export default router; // Exporta as rotas para uso em outros arquivos
