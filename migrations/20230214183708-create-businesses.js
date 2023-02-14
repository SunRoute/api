'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.createTable('businesses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tradingName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      cif: {
        allowNull: false,
        type: Sequelize.STRING(10)
      },
      adress: {
        allowNull: false,
        type: Sequelize.STRING
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING
      },
      postalCode: {
        allowNull: false,
        type: Sequelize.STRING(6)
      },
      phone: {
        allowNull: false,
        type: Sequelize.STRING(13)
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      timetable: {
        allowNull: false,
        type: Sequelize.STRING
      },
      openingDays: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },

  async down (queryInterface, Sequelize) {
   
    await queryInterface.dropTable('businesses');
  }
};

