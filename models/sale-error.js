const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('SaleError', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        shoppingCartId: {
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
        errorCode: {
            type: DataTypes.DECIMAL(5,0),
            allowNull: false
        },
        errorMessage: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'sale_errors',
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
                    { name: "shoppingCartId" },
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
