const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('SaleDetail', {
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
            allowNull: false,
            validate: {
                isInt:{
                    msg: "quantity debe ser un número"
                },
                notEmpty:{
                    msg: "El campo quantity no puede estar vacío"
                },
                notNull:{
                    msg: "Campo quantity obligatorio"
                }
            }
        },
        price: {
            type: DataTypes.DECIMAL(6,2).UNSIGNED,
            allowNull: false,
            validate: {
                isDecimal:{
                    msg: "price debe ser un número y el decimal se debe separar con un punto (0.00)"
                },
                notEmpty:{
                    msg: "El campo price no puede estar vacío"
                },
                notNull:{
                    msg: "Campo price obligatorio"
                }
            }
        },
        measuringUnit: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty:{
                    msg: "El campo measuringUnit no puede estar vacío"
                },
                notNull:{
                    msg: "Campo measuringUnit obligatorio"
                }
            }
        },
        productName: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty:{
                    msg: "El campo productName no puede estar vacío"
                },
                notNull:{
                    msg: "Campo productName obligatorio"
                }
            }
        },
        taxType: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            validate: {
                isInt:{
                    msg: "taxType debe ser un número"
                },
                notEmpty:{
                    msg: "El campo taxType no puede estar vacío"
                },
                notNull:{
                    msg: "Campo taxType obligatorio"
                }
            }
        }
    }, {
        sequelize,
        tableName: 'sale_details',
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
                name: "saleId",
                using: "BTREE",
                fields: [
                    { name: "saleId" },
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
