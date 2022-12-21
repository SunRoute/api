const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('ImageResize', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        imageOriginalId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'image_originals',
                key: 'id'
            }
        },
        imageSettingsId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'image_settings',
                key: 'id'
            }
        },
        title: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        alt: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        path: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        languageAlias: {
            type: DataTypes.STRING(2),
            allowNull: false
        },
        entity: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        entityKey: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        filename: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        content: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        mimeType: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        grid: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        sizeBytes: {
            type: DataTypes.INTEGER.UNSIGNED,
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
        tableName: 'image_resizes',
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
                name: "imageOriginalId",
                using: "BTREE",
                fields: [
                    { name: "imageOriginalId" },
                ]
            },
            {
                name: "imageSettingsId",
                using: "BTREE",
                fields: [
                    { name: "imageSettingsId" },
                ]
            },
        ]
    });
};
