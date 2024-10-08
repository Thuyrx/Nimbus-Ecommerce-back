'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('carrinhos', {
            id_carrinho: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            id_usuario: { // Mantenha este nome, mas ele deve referenciar a coluna id na tabela usuarios
                type: Sequelize.INTEGER,
                references: {
                    model: 'usuarios', // Nome da tabela que está sendo referenciada
                    key: 'id', // A chave primária da tabela usuarios
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                allowNull: false,
            },
            data_criacao: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('carrinhos');
    }
};
