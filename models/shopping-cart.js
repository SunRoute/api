const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    const ShoppingCart = sequelize.define('ShoppingCart', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        customerId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'customers',
                key: 'id'
            }
        },
        fingerprintId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'fingerprints',
                key: 'id'
            }
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    }, {
        sequelize,
        tableName: 'shopping_carts',
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
    ShoppingCart.associate = function(models){
        ShoppingCart.hasMany(models.ShoppingCartDetail, { as: "shopping_cart_details", foreignKey: "shoppingCartId"});
        ShoppingCart.hasMany(models.SaleError, { as: "sale_errors", foreignKey: "shoppingCartId"});
        ShoppingCart.hasMany(models.Sale, { as: "sales", foreignKey: "shoppingCartId"});
        ShoppingCart.belongsTo(models.Customer, { as: "customers", foreignKey: "customerId"});
        ShoppingCart.belongsTo(models.Fingerprint, { as: "fingerprints", foreignKey: "fingerprintId"});
    };

    return ShoppingCart;
};
