const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    const Image = sequelize.define('Image', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        imageSettingId: {
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
        originalFilename: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty:{
                    msg: "El campo originalFilename no puede estar vacío"
                },
                notNull:{
                    msg: "Campo originalFilename obligatorio"
                }
            }
        },
        resizedFilename: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty:{
                    msg: "El campo resizedFilename no puede estar vacío"
                },
                notNull:{
                    msg: "Campo resizedFilename obligatorio"
                }
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
        mediaQuery: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty:{
                    msg: "El campo mediaQuery no puede estar vacío"
                },
                notNull:{
                    msg: "Campo mediaQuery obligatorio"
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
        latency: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            validate: {
                isInt:{
                    msg: "latency debe ser un número"
                },
                notEmpty:{
                    msg: "El campo latency no puede estar vacío"
                },
                notNull:{
                    msg: "Campo latency obligatorio"
                }
            }
        }
    }, {
        sequelize,
        tableName: 'images',
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
                name: "imageSettingId",
                using: "BTREE",
                fields: [
                    { name: "imageSettingId" },
                ]
            }
        ]
    });
    Image.associate = function(models) {
        Image.belongsTo(models.ImageSetting, { foreignKey: 'imageSettingsId' });
    };

    return Image;
};
