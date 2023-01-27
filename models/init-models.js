var DataTypes = require("sequelize").DataTypes;
var _Business = require("./business");
var _Contact = require("./contact");
var _Customer = require("./customer");
var _Fingerprint = require("./fingerprint");
var _Image = require("./image");
var _ImageSetting = require("./image-setting");
var _Language = require("./language");
var _Locale = require("./locale");
var _PaymentMethod = require("./payment-method");
var _ProductCategory = require("./product-category");
var _Product = require("./product");
var _RefundDetail = require("./refund-detail");
var _Refund = require("./refund");
var _SaleDetail = require("./sale-detail");
var _SaleError = require("./sale-error");
var _Sale = require("./sale");
var _ShoppingCartDetail = require("./shopping-cart-detail");
var _ShoppingCart = require("./shopping-cart");
var _Slider = require("./slider");
var _Tax = require("./tax");

function initModels(sequelize) {
    var Business = _Business(sequelize, DataTypes);
    var Contact = _Contact(sequelize, DataTypes);
    var Customer = _Customer(sequelize, DataTypes);
    var Fingerprint = _Fingerprint(sequelize, DataTypes);
    var Image = _Image(sequelize, DataTypes);
    var ImageSetting = _ImageSetting(sequelize, DataTypes);
    var Language = _Language(sequelize, DataTypes);
    var Locale = _Locale(sequelize, DataTypes);
    var PaymentMethod = _PaymentMethod(sequelize, DataTypes);
    var ProductCategory = _ProductCategory(sequelize, DataTypes);
    var Product = _Product(sequelize, DataTypes);
    var RefundDetail = _RefundDetail(sequelize, DataTypes);
    var Refund = _Refund(sequelize, DataTypes);
    var SaleDetail = _SaleDetail(sequelize, DataTypes);
    var SaleError = _SaleError(sequelize, DataTypes);
    var Sale = _Sale(sequelize, DataTypes);
    var ShoppingCartDetail = _ShoppingCartDetail(sequelize, DataTypes);
    var ShoppingCart = _ShoppingCart(sequelize, DataTypes);
    var Slider = _Slider(sequelize, DataTypes);
    var Tax = _Tax(sequelize, DataTypes);

    Fingerprint.belongsTo(Customer, { as: "customer", foreignKey: "customerId"});
    Customer.hasMany(Fingerprint, { as: "fingerprints", foreignKey: "customerId"});
    Refund.belongsTo(Customer, { as: "customer", foreignKey: "customerId"});
    Customer.hasMany(Refund, { as: "refunds", foreignKey: "customerId"});
    SaleError.belongsTo(Customer, { as: "customer", foreignKey: "customerId"});
    Customer.hasMany(SaleError, { as: "sale_errors", foreignKey: "customerId"});
    Sale.belongsTo(Customer, { as: "customer", foreignKey: "customerId"});
    Customer.hasMany(Sale, { as: "sales", foreignKey: "customerId"});
    ShoppingCart.belongsTo(Customer, { as: "customer", foreignKey: "customerId"});
    Customer.hasMany(ShoppingCart, { as: "shopping_carts", foreignKey: "customerId"});
    Contact.belongsTo(Fingerprint, { as: "fingerprint", foreignKey: "fingerprintId"});
    Fingerprint.hasMany(Contact, { as: "contacts", foreignKey: "fingerprintId"});
    ShoppingCart.belongsTo(Fingerprint, { as: "fingerprint", foreignKey: "fingerprintId"});
    Fingerprint.hasMany(ShoppingCart, { as: "shopping_carts", foreignKey: "fingerprintId"});
    Image.belongsTo(ImageSetting, { as: "imageSetting", foreignKey: "imageSettingsId"});
    ImageSetting.hasMany(Image, { as: "images", foreignKey: "imageSettingsId"});
    Refund.belongsTo(PaymentMethod, { as: "paymentMethod", foreignKey: "paymentMethodId"});
    PaymentMethod.hasMany(Refund, { as: "refunds", foreignKey: "paymentMethodId"});
    SaleError.belongsTo(PaymentMethod, { as: "paymentMethod", foreignKey: "paymentMethodId"});
    PaymentMethod.hasMany(SaleError, { as: "sale_errors", foreignKey: "paymentMethodId"});
    Sale.belongsTo(PaymentMethod, { as: "paymentMethod", foreignKey: "paymentMethodId"});
    PaymentMethod.hasMany(Sale, { as: "sales", foreignKey: "paymentMethodId"});
    Product.belongsTo(ProductCategory, { as: "category", foreignKey: "categoryId"});
    ProductCategory.hasMany(Product, { as: "products", foreignKey: "categoryId"});
    RefundDetail.belongsTo(Product, { as: "product", foreignKey: "productId"});
    Product.hasMany(RefundDetail, { as: "refund_details", foreignKey: "productId"});
    SaleDetail.belongsTo(Product, { as: "product", foreignKey: "productId"});
    Product.hasMany(SaleDetail, { as: "sale_details", foreignKey: "productId"});
    ShoppingCartDetail.belongsTo(Product, { as: "product", foreignKey: "productId"});
    Product.hasMany(ShoppingCartDetail, { as: "shopping_cart_details", foreignKey: "productId"});
    RefundDetail.belongsTo(ShoppingCart, { as: "refund", foreignKey: "refundId"});
    ShoppingCart.hasMany(RefundDetail, { as: "refund_details", foreignKey: "refundId"});
    Refund.belongsTo(ShoppingCart, { as: "sale", foreignKey: "saleId"});
    ShoppingCart.hasMany(Refund, { as: "refunds", foreignKey: "saleId"});
    SaleDetail.belongsTo(ShoppingCart, { as: "sale", foreignKey: "saleId"});
    ShoppingCart.hasMany(SaleDetail, { as: "sale_details", foreignKey: "saleId"});
    SaleError.belongsTo(ShoppingCart, { as: "shoppingCart", foreignKey: "shoppingCartId"});
    ShoppingCart.hasMany(SaleError, { as: "sale_errors", foreignKey: "shoppingCartId"});
    Sale.belongsTo(ShoppingCart, { as: "shoppingCart", foreignKey: "shoppingCartId"});
    ShoppingCart.hasMany(Sale, { as: "sales", foreignKey: "shoppingCartId"});
    ShoppingCartDetail.belongsTo(ShoppingCart, { as: "shoppingCart", foreignKey: "shoppingCartId"});
    ShoppingCart.hasMany(ShoppingCartDetail, { as: "shopping_cart_details", foreignKey: "shoppingCartId"});
    Product.belongsTo(Tax, { as: "tax", foreignKey: "taxId"});
    Tax.hasMany(Product, { as: "products", foreignKey: "taxId"});

    return {
        Business,
        Contact,
        Customer,
        Fingerprint,
        Image,
        ImageSetting,
        Language,
        Locale,
        PaymentMethod,
        ProductCategory,
        Product,
        RefundDetail,
        Refund,
        SaleDetail,
        SaleError,
        Sale,
        ShoppingCartDetail,
        ShoppingCart,
        Slider,
        Tax,
    };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
