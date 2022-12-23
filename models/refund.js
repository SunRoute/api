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
            allowNull: false,
            validate: {
                notEmpty:{
                    msg: "El campo reference no puede estar vacío"
                },
                notNull:{
                    msg: "Campo reference obligatorio"
                }
            }
        },
        totalPrice: {
            type: DataTypes.DECIMAL(10,2).UNSIGNED,
            allowNull: false,
            validate: {
                isDecimal:{
                    msg: "totalPrice debe ser un número y el decimal se debe separar con un punto (0.00)"
                },
                notEmpty:{
                    msg: "El campo totalPrice no puede estar vacío"
                },
                notNull:{
                    msg: "Campo totalPrice obligatorio"
                }
            }
        },
        basePrice: {
            type: DataTypes.DECIMAL(10,2).UNSIGNED,
            allowNull: false,
            validate: {
                isDecimal:{
                    msg: "basePrice debe ser un número y el decimal se debe separar con un punto (0.00)"
                },
                notEmpty:{
                    msg: "El campo basePrice no puede estar vacío"
                },
                notNull:{
                    msg: "Campo basePrice obligatorio"
                }
            }
        },
        totalTaxPrice: {
            type: DataTypes.DECIMAL(10,2).UNSIGNED,
            allowNull: false,
            validate: {
                isDecimal:{
                    msg: "totalTaxPrice debe ser un número y el decimal se debe separar con un punto (0.00)"
                },
                notEmpty:{
                    msg: "El campo totalTaxPrice no puede estar vacío"
                },
                notNull:{
                    msg: "Campo totalTaxPrice obligatorio"
                }
            }
        },
        issueDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        issueHour: {
            type: DataTypes.TIME,
            allowNull: false,
            defaultValue: DataTypes.NOW
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
