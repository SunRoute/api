// ESTE ARCHIVO ARRANCA TODOS LOS MODELOS
var DataTypes = require("sequelize").DataTypes;
var _PaymentMethod = require("./payment-method");
var _Tax = require("./tax");

function initModels(sequelize) {
    var PaymentMethod = _PaymentMethod(sequelize, DataTypes);
    var Tax = _Tax(sequelize, DataTypes);


    return {
        PaymentMethod,
        Tax,
    };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
