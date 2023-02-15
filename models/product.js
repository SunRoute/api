const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    const Product = sequelize.define('Product', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'product_categories',
                key: 'id'
            }
        },
        taxId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'taxes',
                key: 'id'
            }
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty:{
                    msg: "El campo name no puede estar vacío"
                },
                notNull:{
                    msg: "Campo name obligatorio"
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
        featured: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        visible: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    }, {
        sequelize,
        tableName: 'products',
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
    Product.associate = function(models){
        Product.belongsTo(models.ProductCategory, { as: "product_categories", foreignKey: "categoryId"});
        Product.hasMany(models.ShoppingCartDetail, { as: "shopping_cart_details", foreignKey: "productId"});
        Product.hasMany(models.RefundDetail, { as: "refund_details", foreignKey: "productId"});
        Product.hasMany(models.SaleDetail, { as: "sale_details", foreignKey: "productId"});
        Product.belongsTo(models.Tax, { as: "taxes", foreignKey: "taxId"});
    };

    return Product;
};
