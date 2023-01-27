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
        name: {
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
        mediaQuery: {
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
