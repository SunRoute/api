const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('RefundDetail', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        refundId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'shopping_carts',
                key: 'id'
            }
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'products',
                key: 'id'
            }
        },
        quantity: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(6,2),
            allowNull: false
        },
        measuringUnit: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        productName: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        taxType: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'refund_details',
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
                name: "refundId",
                using: "BTREE",
                fields: [
                    { name: "refundId" },
                ]
            },
            {
                name: "productId",
                using: "BTREE",
                fields: [
                    { name: "productId" },
                ]
            },
        ]
    });
};
