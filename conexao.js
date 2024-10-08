// conect.js
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('conexao', 'root', 'Senha123@', {
    host: 'localhost',
    dialect: 'mysql',
});

sequelize.authenticate()
    .then(() => console.log('Conectado com sucesso!'))
    .catch(err => console.log('Falha ao se conectar: ' + err));

export default sequelize;
