const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('ImageOriginal', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
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
        }
    }, {
        sequelize,
        tableName: 'image_originals',
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
