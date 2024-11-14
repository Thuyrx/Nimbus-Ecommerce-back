// conexao.js
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

// Verificando se as variáveis de ambiente necessárias estão definidas
const { MYSQL_DATABASE, MYSQLUSER, MYSQLPASSWORD, MYSQLHOST } = process.env;

if (!MYSQL_DATABASE || !MYSQLUSER || !MYSQLPASSWORD || !MYSQLHOST) {
    console.log("Variáveis de ambiente carregadas:", {
        MYSQL_DATABASE: process.env.MYSQL_DATABASE,
        MYSQLUSER: process.env.MYSQLUSER,
        MYSQLPASSWORD: process.env.MYSQLPASSWORD,
        MYSQLHOST: process.env.MYSQLHOST,
    });
    throw new Error("As variáveis de ambiente do banco de dados não estão configuradas corretamente.");
}

// Criar uma nova instância do Sequelize com as informações do banco de dados
const conexao = new Sequelize(MYSQL_DATABASE, MYSQLUSER, MYSQLPASSWORD, {
    host: MYSQLHOST,
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
