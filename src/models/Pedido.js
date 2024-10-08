// models/Pedido.js
export default (sequelize, DataTypes) => {
    const Pedido = sequelize.define('Pedido', {
      id_pedido: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      data_pedido: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      status: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    }, {
      tableName: 'pedidos',
      timestamps: false,
    });
  
    // Relacionamentos
    Pedido.associate = (models) => {
      Pedido.belongsTo(models.Usuario, {
        foreignKey: 'id_usuario',
      });
      Pedido.hasMany(models.ItemPedido, {
        foreignKey: 'id_pedido',
      });
    };
  
    return Pedido;
  };
  