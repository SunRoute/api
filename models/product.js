const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Product', {
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
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(6,2),
            allowNull: false
        },
        destacado: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        visible: {
            type: DataTypes.BOOLEAN,
            allowNull: false
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
            },
            {
                name: "categoryId",
                using: "BTREE",
                fields: [
                    { name: "categoryId" },
                ]
            },
            {
                name: "taxId",
                using: "BTREE",
                fields: [
                    { name: "taxId" },
                ]
            },
        ]
    });
};
