'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.createTable('sales', {
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
      reference: {
        allowNull: false,
        type: Sequelize.STRING
      },
      totalPrice: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2).UNSIGNED
      },
      basePrice: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2).UNSIGNED
      },
      totalTaxPrice: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2).UNSIGNED
      },
      issueDate: {
        allowNull: false,
        type: Sequelize.DATEONLY,
        default: Sequelize.NOW
      },
      issueHour: {
        allowNull: false,
        type: Sequelize.TIME,
        default: Sequelize.NOW
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
   
    await queryInterface.dropTable('sales');
  }
};