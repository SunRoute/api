'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      categoryId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: { 
          model: 'product_categories', 
          key: 'id' 
          }, 
          onUpdate: 'CASCADE', 
          onDelete: 'SET NULL'
      },
      taxId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: { 
          model: 'taxes', 
          key: 'id' 
          }, 
          onUpdate: 'CASCADE', 
          onDelete: 'SET NULL'
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      price: {
        allowNull: false,
        type: Sequelize.DECIMAL(6, 2).UNSIGNED
      },
      destacado: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      visible: {
        allowNull: false,
        type: Sequelize.BOOLEAN
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
   
    await queryInterface.dropTable('products');
  }
};
