const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Locale', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
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
        key: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty:{
                    msg: "El campo key no puede estar vacío"
                },
                notNull:{
                    msg: "Campo key obligatorio"
                }
            }
        },
        value: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty:{
                    msg: "El campo value no puede estar vacío"
                },
                notNull:{
                    msg: "Campo value obligatorio"
                }
            }
        }
    }, {
        sequelize,
        tableName: 'locales',
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
