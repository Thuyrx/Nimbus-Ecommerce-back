module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('item_carrinho', {
      id_item: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      id_carrinho: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'carrinhos', key: 'id_carrinho' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      id_produto: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'produtos', key: 'id_produto' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('item_carrinho');
  }
};
