'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.createTable('image_resizes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      imageOriginalId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: { 
          model: 'image_originals', 
          key: 'id' 
          }, 
          onUpdate: 'CASCADE', 
          onDelete: 'SET NULL'
      },
      imageSettingsId: {
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
      path: {
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
      filename: {
        allowNull: false,
        type: Sequelize.STRING
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING
      },
      mimeType: {
        allowNull: false,
        type: Sequelize.STRING
      },
      grid: {
        allowNull: false,
        type: Sequelize.STRING
      },
      sizeBytes: {
        allowNull: false,
        type: Sequelize.INTEGER.UNSIGNED
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
   
    await queryInterface.dropTable('image_resizes');
  }
};

