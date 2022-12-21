const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Refund', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        saleId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'shopping_carts',
                key: 'id'
            }
        },
        customerId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'customers',
                key: 'id'
            }
        },
        paymentMethodId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'payment_methods',
                key: 'id'
            }
        },
        reference: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        totalPrice: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        },
        basePrice: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        },
        totalTaxPrice: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        },
        issueDate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        issueHour: {
            type: DataTypes.TIME,
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'refunds',
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
            {
                name: "shoppingCartId",
                using: "BTREE",
                fields: [
                    { name: "saleId" },
                ]
            },
            {
                name: "customerId",
                using: "BTREE",
                fields: [
                    { name: "customerId" },
                ]
            },
            {
                name: "paymentMethodId",
                using: "BTREE",
                fields: [
                    { name: "paymentMethodId" },
                ]
            },
        ]
    });
};
