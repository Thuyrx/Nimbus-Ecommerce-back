// models/ItemPedido.js
export default (sequelize, DataTypes) => {
    const ItemPedido = sequelize.define('ItemPedido', {
      id_item_pedido: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      id_pedido: {
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
      preco_unitario: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    }, {
      tableName: 'itens_pedido',
      timestamps: false,
    });
  
    // Relacionamentos
    ItemPedido.associate = (models) => {
      ItemPedido.belongsTo(models.Pedido, {
        foreignKey: 'id_pedido',
      });
      ItemPedido.belongsTo(models.Produto, {
        foreignKey: 'id_produto',
      });
    };
  
    return ItemPedido;
  };
  