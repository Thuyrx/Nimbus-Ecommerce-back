// models/ItemCarrinho.js
export default (sequelize, DataTypes) => {
    const ItemCarrinho = sequelize.define('ItemCarrinho', {
      id_item: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      id_carrinho: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_produto: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }, {
      tableName: 'item_carrinho',
      timestamps: false,
    });
  
    // Relacionamentos
    ItemCarrinho.associate = (models) => {
      ItemCarrinho.belongsTo(models.Carrinho, {
        foreignKey: 'id_carrinho',
      });
      ItemCarrinho.belongsTo(models.Produto, {
        foreignKey: 'id_produto',
      });
    };
  
    return ItemCarrinho;
  };
  