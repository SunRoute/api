'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.createTable('sale_errors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      shoppingCartId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: { 
          model: 'shopping_carts', 
          key: 'id' 
          }, 
          onUpdate: 'CASCADE', 
          onDelete: 'SET NULL'
      },
      customerId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: { 
          model: 'customers', 
          key: 'id' 
          }, 
          onUpdate: 'CASCADE', 
          onDelete: 'SET NULL'
      },
        paymentMethodId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: { 
          model: 'payment_methods', 
          key: 'id' 
          }, 
          onUpdate: 'CASCADE', 
          onDelete: 'SET NULL'
      },
      errorCode: {
        allowNull: false,
        type: Sequelize.DECIMAL(5).UNSIGNED
      },
      errorMessage: {
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
   
    await queryInterface.dropTable('sale_errors');
  }
};