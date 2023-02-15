const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    const SaleError = sequelize.define('SaleError', {
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
            type: DataTypes.INTEGER(5).UNSIGNED,
            allowNull: false,
            validate: {
                notEmpty:{
                    msg: "El campo errorCode no puede estar vacío"
                },
                notNull:{
                    msg: "Campo errorCode obligatorio"
                }
            }
        },
        errorMessage: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty:{
                    msg: "El campo errorMessage no puede estar vacío"
                },
                notNull:{
                    msg: "Campo errorMessage obligatorio"
                }
            }
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
            }
        ]
    });
    SaleError.associate = function(models){
        SaleError.belongsTo(models.ShoppingCart, { as: "cart", foreignKey: "shoppingCartId"});
        SaleError.belongsTo(models.Customer, { as: "customers", foreignKey: "customerId"});
        SaleError.belongsTo(models.PaymentMethod, { as: "payment-methods", foreignKey: "paymentMethodId"});
    };

    return SaleError;
};
