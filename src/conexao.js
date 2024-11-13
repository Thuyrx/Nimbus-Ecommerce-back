// conexao.js
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

// Verificando se as variáveis de ambiente necessárias estão definidas
const { DB_NAME, DB_USER, DB_PASS, DB_HOST } = process.env;

if (!DB_NAME || !DB_USER || !DB_PASS || !DB_HOST) {
    console.log("Variáveis de ambiente carregadas:", {
        DB_NAME: process.env.DB_NAME,
        DB_USER: process.env.DB_USER,
        DB_PASS: process.env.DB_PASS,
        DB_HOST: process.env.DB_HOST,
    });
    throw new Error("As variáveis de ambiente do banco de dados não estão configuradas corretamente.");
}

// Criar uma nova instância do Sequelize com as informações do banco de dados
const conexao = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    dialect: 'mysql', // Dialeto do banco de dados
});

// Testando a conexão com o banco de dados
const testConnection = async () => {
    try {
        await conexao.authenticate();
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
    } catch (error) {
        console.error('Não foi possível conectar ao banco de dados:', error);
    }
};

// Executar o teste de conexão
testConnection();

export default conexao; // Exportar a conexão para ser usada em outros arquivos
