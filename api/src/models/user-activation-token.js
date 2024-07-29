module.exports = function (sequelize, DataTypes) {
  const UserActivationToken = sequelize.define('UserActivationToken',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false
      },
      expirationDate: {
        type: DataTypes.DATE,
        allowNull: false
      },
      used: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
      }
    }, {
      sequelize,
      tableName: 'user_activation_tokens',
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
          name: 'user_activation_tokens_userId_fk',
          using: 'BTREE',
          fields: [
            { name: 'saleId' }
          ]
        }
      ]
    }
  )

  UserActivationToken.associate = function (models) {
    UserActivationToken.belongsTo(models.User, { as: 'user', foreignKey: 'userId' })
  }

  return UserActivationToken
}