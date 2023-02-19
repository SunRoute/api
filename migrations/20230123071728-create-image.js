'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.createTable('images', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      imageSettingId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: { 
          model: 'image_settings', 
          key: 'id' 
          }, 
          onUpdate: 'CASCADE', 
          onDelete: 'SET NULL'
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING(150)
      },
      alt: {
        allowNull: false,
        type: Sequelize.STRING
      },
      languageAlias: {
        allowNull: false,
        type: Sequelize.STRING(2)
      },
      entity: {
        allowNull: false,
        type: Sequelize.STRING
      },
      entityKey: {
        allowNull: false,
        type: Sequelize.INTEGER.UNSIGNED
      },
      originalFilename: {
        allowNull: false,
        type: Sequelize.STRING
      },
      resizedFilename: {
        allowNull: false,
        type: Sequelize.STRING
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      mediaQuery: {
        allowNull: false,
        type: Sequelize.STRING
      },
      sizeBytes: {
        allowNull: false,
        type: Sequelize.INTEGER.UNSIGNED
      },
      latency: {
        allowNull: false,
        type: Sequelize.INTEGER.UNSIGNED
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
   
    await queryInterface.dropTable('images');
  }
};


