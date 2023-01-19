'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.createTable('image_settings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      entity: {
        allowNull: false,
        type: Sequelize.STRING
      },
      name: {
        allowNull: true,
        type: Sequelize.STRING
      },
      mediaQuery: {
        allowNull: false,
        type: Sequelize.STRING
      },
      widthPx: {
        allowNull: false,
        type: Sequelize.INTEGER(4).UNSIGNED
      },
      heightPx: {
        allowNull: false,
        type: Sequelize.INTEGER(4).UNSIGNED
      },
      quality: {
        allowNull: false,
        type: Sequelize.INTEGER(3).UNSIGNED
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
   
    await queryInterface.dropTable('image_settings');
  }
};

