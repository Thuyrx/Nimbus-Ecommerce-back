// models/Usuario.js
import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../conexao'; // Assumindo que o conect.js está na pasta acima

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
    tableName: 'usuarios', // Nome da tabela no banco
    timestamps: false, // Se você não estiver usando createdAt e updatedAt
});

export default Usuario;
