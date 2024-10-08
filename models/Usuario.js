import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../conexao.js'; // Importação corrigida

const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
}, {
    tableName: 'usuarios',
    timestamps: false,
});

export default Usuario;
