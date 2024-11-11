// Produto.js
export default (sequelize, DataTypes) => {
    const Produto = sequelize.define(
        'Produto',
        {
            id_produto: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            nome: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            descricao: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            preco: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
            estoque: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            categoria: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            imagem: {
                type: DataTypes.STRING, // Apenas o caminho da imagem
                allowNull: true,
            },
        },
        {
            tableName: 'produtos',
            timestamps: true,
        }
    );

    Produto.associate = (models) => {
        Produto.hasMany(models.ItemCarrinho, {
            foreignKey: 'id_produto',
        });
        Produto.hasMany(models.ItemPedido, {
            foreignKey: 'id_produto',
        });
    };

    return Produto;
};
