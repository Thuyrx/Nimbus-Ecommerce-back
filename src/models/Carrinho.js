// models/Carrinho.js
export default (sequelize, DataTypes) => {
    const Carrinho = sequelize.define('Carrinho', {
      id_carrinho: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      data_criacao: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    }, {
      tableName: 'carrinhos',
      timestamps: false,
    });
  
    // Relacionamentos
    Carrinho.associate = (models) => {
      Carrinho.belongsTo(models.Usuario, {
        foreignKey: 'id_usuario',
      });
      Carrinho.hasMany(models.ItemCarrinho, {
        foreignKey: 'id_carrinho',
      });
    };
  
    return Carrinho;
  };
  