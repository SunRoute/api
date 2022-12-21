const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('ImageSetting', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        entity: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        directory: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        type: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        content: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        grid: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        acceptedContent: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        extensionConversion: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        widthPx: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        heightPx: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        quality: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'image_settings',
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
        ]
    });
};
