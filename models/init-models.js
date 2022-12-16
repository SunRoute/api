var DataTypes = require("sequelize").DataTypes;
var _Customer = require("./customer");
var _Language = require("./language");
var _PaymentMethod = require("./payment-method");
var _ProductCategory = require("./product-category");
var _Product = require("./product");
var _Slider = require("./slider");
var _Tax = require("./tax");

function initModels(sequelize) {
    var Customer = _Customer(sequelize, DataTypes);
    var Language = _Language(sequelize, DataTypes);
    var PaymentMethod = _PaymentMethod(sequelize, DataTypes);
    var ProductCategory = _ProductCategory(sequelize, DataTypes);
    var Product = _Product(sequelize, DataTypes);
    var Slider = _Slider(sequelize, DataTypes);
    var Tax = _Tax(sequelize, DataTypes);

    Product.belongsTo(ProductCategory, { as: "category", foreignKey: "categoryId"});
    ProductCategory.hasMany(Product, { as: "products", foreignKey: "categoryId"});
    Product.belongsTo(Tax, { as: "tax", foreignKey: "taxId"});
    Tax.hasMany(Product, { as: "products", foreignKey: "taxId"});

    return {
        Customer,
        Language,
        PaymentMethod,
        ProductCategory,
        Product,
        Slider,
        Tax,
    };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
