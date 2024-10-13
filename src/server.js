import express from 'express';
import usuarioRoutes from './routes/usuarios.js';
import carrinhoRoutes from './routes/carrinhos.js';
import produtoRoutes from './routes/produtos.js';
import ItemCarrinhoRoutes from './routes/item_carrinho.js';
import conexao from './conexao.js'; // Importação da conexão

const app = express();
app.use(express.json());

app.use('/usuarios', usuarioRoutes);
app.use('/carrinhos', carrinhoRoutes);
app.use('/produtos', produtoRoutes);
app.use('/item_carrinho', ItemCarrinhoRoutes);

// Estabelecer a conexão com o banco de dados e iniciar o servidor
const initServer = async () => {
    try {
        await conexao.authenticate(); // Testar a conexão
        console.log('Conexão com o banco de dados estabelecida com sucesso.');

        // Iniciar o servidor
        app.listen(3000, () => {
            console.log('Servidor rodando na porta 3000'); // Mensagem indicando que o servidor está funcionando
        });
    } catch (error) {
        console.error('Não foi possível conectar ao banco de dados:', error);
    }
};

initServer(); // Chama a função para iniciar o servidor
