const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    const Faq = sequelize.define('Faq', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        faqCategoryId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'faq_categories',
                key: 'id'
            }
        },
        question: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty:{
                    msg: "El campo question no puede estar vacío"
                },
                notNull:{
                    msg: "Campo question obligatorio"
                }
            }
        },
        answer: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty:{
                    msg: "El campo answer no puede estar vacío"
                },
                notNull:{
                    msg: "Campo answer obligatorio"
                }
            }
        }
    }, {
        sequelize,
        tableName: 'faqs',
        timestamps: true,
        paranoid: true,
        indexes: [
            {
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "id" },
                ]
            }
        ]
    });
    Faq.associate = function(models){
        Faq.belongsTo(models.FaqCategory, { as: "faq_categories", foreignKey: "faqCategoryId"});
    };
    return Faq;
};
