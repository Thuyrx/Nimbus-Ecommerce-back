// models/Usuario.js
export default (sequelize, DataTypes) => {
    const Usuario = sequelize.define('Usuario', {
        id_usuario: { 
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nome: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(150),
            allowNull: false,
            unique: true,
        },
        senha: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        data_criacao: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        idade: { // Adicione este campo
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    }, {
        tableName: 'usuarios',
        timestamps: false,
    });
  
    // Relacionamentos
    Usuario.associate = (models) => {
        Usuario.hasMany(models.Carrinho, {
            foreignKey: 'id_usuario',
        });
        Usuario.hasMany(models.Pedido, {
            foreignKey: 'id_usuario',
        });
    };
  
    return Usuario;
  };
  