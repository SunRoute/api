const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Language', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
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
        alias: {
            type: DataTypes.STRING(2),
            allowNull: false,
            validate: {
                isAlpha:{
                    msg: "alias debe contener dos letras"
                },
                notEmpty:{
                    msg: "El campo alias no puede estar vacío"
                },
                notNull:{
                    msg: "Campo alias obligatorio"
                }
            }
        },
        visible: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    }, {
        sequelize,
        tableName: 'languages',
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
