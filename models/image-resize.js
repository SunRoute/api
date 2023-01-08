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
            allowNull: false,
            validate: {
                notEmpty:{
                    msg: "El campo title no puede estar vacío"
                },
                notNull:{
                    msg: "Campo title obligatorio"
                }
            }
        },
        alt: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty:{
                    msg: "El campo alt no puede estar vacío"
                },
                notNull:{
                    msg: "Campo alt obligatorio"
                }
            }
        },
        path: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty:{
                    msg: "El campo path no puede estar vacío"
                },
                notNull:{
                    msg: "Campo path obligatorio"
                }
            }
        },
        languageAlias: {
            type: DataTypes.STRING(2),
            allowNull: false,
            validate: {
                isAlpha:{
                    msg: "languageAlias debe contener dos letras"
                },
                notEmpty:{
                    msg: "El campo languageAlias no puede estar vacío"
                },
                notNull:{
                    msg: "Campo languageAlias obligatorio"
                }
            }
        },
        entity: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty:{
                    msg: "El campo entity no puede estar vacío"
                },
                notNull:{
                    msg: "Campo entity obligatorio"
                }
            }
        },
        entityKey: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            validate: {
                isInt:{
                    msg: "entityKey debe ser un número"
                },
                notEmpty:{
                    msg: "El campo entityKey no puede estar vacío"
                },
                notNull:{
                    msg: "Campo entityKey obligatorio"
                }
            }
        },
        filename: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty:{
                    msg: "El campo filename no puede estar vacío"
                },
                notNull:{
                    msg: "Campo filename obligatorio"
                }
            }
        },
        content: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty:{
                    msg: "El campo content no puede estar vacío"
                },
                notNull:{
                    msg: "Campo content obligatorio"
                }
            }
        },
        mimeType: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty:{
                    msg: "El campo mimeType no puede estar vacío"
                },
                notNull:{
                    msg: "Campo mimeType obligatorio"
                }
            }
        },
        grid: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty:{
                    msg: "El campo grid no puede estar vacío"
                },
                notNull:{
                    msg: "Campo grid obligatorio"
                }
            }
        },
        sizeBytes: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            validate: {
                isInt:{
                    msg: "sizeBytes debe ser un número"
                },
                notEmpty:{
                    msg: "El campo sizeBytes no puede estar vacío"
                },
                notNull:{
                    msg: "Campo sizeBytes obligatorio"
                }
            }
        },
        widthPx: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            validate: {
                isInt:{
                    msg: "widthPx debe ser un número"
                },
                notEmpty:{
                    msg: "El campo widthPx no puede estar vacío"
                },
                notNull:{
                    msg: "Campo widthPx obligatorio"
                }
            }
        },
        heightPx: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            validate: {
                isInt:{
                    msg: "heightPx debe ser un número"
                },
                notEmpty:{
                    msg: "El campo heightPx no puede estar vacío"
                },
                notNull:{
                    msg: "Campo heightPx obligatorio"
                }
            }
        },
        quality: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            validate: {
                isInt:{
                    msg: "quality debe ser un número"
                },
                notEmpty:{
                    msg: "El campo quality no puede estar vacío"
                },
                notNull:{
                    msg: "Campo quality obligatorio"
                }
            }
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
