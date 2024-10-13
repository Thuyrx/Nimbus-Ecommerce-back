export default (sequelize, DataTypes) => {
  const Produto = sequelize.define('Produto', {
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
      imagem_url: {
          type: DataTypes.STRING(255),
          allowNull: true,
      },
  }, {
      tableName: 'produtos',
      timestamps: true, // Habilitar timestamps para criar createdAt e updatedAt
  });

  // Relacionamentos
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
