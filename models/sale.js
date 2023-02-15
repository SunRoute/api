const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    const Sale = sequelize.define('Sale', {
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
            allowNull: true,
            defaultValue: DataTypes.NOW
        },
        issueHour: {
            type: DataTypes.TIME,
            allowNull: true,
            defaultValue: DataTypes.NOW
        }
    }, {
        sequelize,
        tableName: 'sales',
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
    Sale.associate = function (models){
        Sale.belongsTo(models.ShoppingCart, { as: "shopping_carts", foreignKey: "cartId"});
        Sale.belongsTo(models.Customer, { as: "customers", foreignKey: "customerId"});
        Sale.belongsTo(models.PaymentMethod, { as: "payment_methods", foreignKey: "payMethodId"});
        Sale.hasMany(models.Refund, { as: "refunds", foreignKey: "saleId"});
        Sale.hasMany(models.SaleDetail, { as: "sale_details", foreignKey: "saleId"});
    };

    return Sale;
};
