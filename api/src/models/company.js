module.exports = function (sequelize, DataTypes) {
  const Company = sequelize.define('Company',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      commercialAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Por favor, rellena el campo "Dirección comercial".'
          },
          notEmpty: {
            msg: 'Por favor, rellena el campo "Dirección comercial".'
          }
        }
      },
      fiscalAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Por favor, rellena el campo "Dirección fiscal".'
          },
          notEmpty: {
            msg: 'Por favor, rellena el campo "Dirección fiscal".'
          }
        }
      },
      commercialName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Por favor, rellena el campo "Nombre Comercial".'
          },
          notEmpty: {
            msg: 'Por favor, rellena el campo "Nombre Comercial".'
          }
        }
      },
      fiscalName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Por favor, rellena el campo "Nombre Fiscal".'
          },
          notEmpty: {
            msg: 'Por favor, rellena el campo "Nombre Fiscal".'
          }
        }
      },
      vatNumber: {
        type: DataTypes.INTEGER,
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
      tableName: 'companies',
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
        }
      ]
    }
  )

  Company.associate = function (models) {

  }

  return Company
}
