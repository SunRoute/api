'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        'faqs',
        'faqCategoryId',
        {
          type: Sequelize.DataTypes.INTEGER,
          references: { 
            model: 'faq_categories', 
            key: 'id' 
            }, 
            onUpdate: 'CASCADE', 
            onDelete: 'SET NULL'
        },
        { transaction }
      );
     
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('faqs', 'faqCategoryId', { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
};

