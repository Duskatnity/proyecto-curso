module.exports = function (sequelize, DataTypes) {
  const Price = sequelize.define('Price',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      basePrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      current: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      deletedAt: {
        type: DataTypes.DATE
      }
    }, {
      DataTypes,
      tableName: 'prices',
      timestamps: true,
      paranoid: true,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [
            { name: 'id' }
          ]
        },
        {
          name: 'prices_productId_fk',
          using: 'BTREE',
          fields: [
            { name: 'productId' }
          ]
        }
      ]
    }
  )

  Price.associate = function (models) {
    Price.belongsTo(models.Product, { as: 'product', foreignKey: 'customerId' })
    Price.hasMany(models.SaleDetail, { as: 'saleDetails', foreignKey: 'saleDetailID' })
  }

  return Price
}
