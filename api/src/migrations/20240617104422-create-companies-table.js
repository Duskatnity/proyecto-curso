'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('companies', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      commercialAddress: {
        type: Sequelize.STRING,
        allowNull: false
      },
      fiscalAddress: {
        type: Sequelize.STRING,
        allowNull: false
      },
      commercialName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      fiscalName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      vatNumber: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('companies')
  }
}
