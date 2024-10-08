// models/Pagamento.js
export default (sequelize, DataTypes) => {
    const Pagamento = sequelize.define('Pagamento', {
      id_pagamento: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      id_pedido: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      valor: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      data_pagamento: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      metodo_pagamento: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      status_pagamento: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    }, {
      tableName: 'pagamentos',
      timestamps: false,
    });
  
    // Relacionamentos
    Pagamento.associate = (models) => {
      Pagamento.belongsTo(models.Pedido, {
        foreignKey: 'id_pedido',
      });
    };
  
    return Pagamento;
  };
  