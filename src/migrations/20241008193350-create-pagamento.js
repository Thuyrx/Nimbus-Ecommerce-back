module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('pagamentos', {
      id_pagamento: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      id_pedido: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'pedidos', key: 'id_pedido' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      valor: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      data_pagamento: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      metodo_pagamento: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      status_pagamento: {
        type: Sequelize.STRING(20),
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('pagamentos');
  }
};
