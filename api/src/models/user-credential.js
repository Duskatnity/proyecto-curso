module.exports = function (sequelize, DataTypes) {
  const UserCredential = sequelize.define('UserCredential',
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
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastPasswordChange: {
        type: DataTypes.DATE,
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
      tableName: 'user_credentials',
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
          name: 'user_credentials_userId_fk',
          using: 'BTREE',
          fields: [
            { name: 'saleId' }
          ]
        }
      ]
    }
  )

  UserCredential.associate = function (models) {
    UserCredential.belongsTo(models.User, { as: 'user', foreignKey: 'userId' })
  }

  return UserCredential
}