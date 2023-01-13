const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Email', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validator: {
                isEmail: {
                    msg: 'Se debe rellenar el campo email en un formato válido.'
                },
                notEmpty:{
                    msg: "El campo email no puede estar vacío"
                },
                notNull: {
                    msg: 'Campo email obligatorio'
                }
            }
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty:{
                    msg: "El campo message no puede estar vacío"
                },
                notNull:{
                    msg: "Campo message obligatorio"
                }
            }
        }
    }, {
        sequelize,
        tableName: 'emails',
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
