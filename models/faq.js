const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Faq', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
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
            },
        ]
    });
};
