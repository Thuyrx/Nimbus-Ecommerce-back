import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql', // ou 'postgres', etc.
});

export default sequelize;
