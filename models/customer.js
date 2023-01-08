const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Customer', {
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
        surname: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty:{
                    msg: "El campo surname no puede estar vacío"
                },
                notNull:{
                    msg: "Campo surname obligatorio"
                }
            }
        },
        phone: {
            type: DataTypes.STRING(10),
            allowNull: false,
            validate: {
                notEmpty:{
                    msg: "El campo phone no puede estar vacío"
                },
                notNull:{
                    msg: "Campo phone obligatorio"
                }
            }
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: true,
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
        adress: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty:{
                    msg: "El campo adress no puede estar vacío"
                },
                notNull:{
                    msg: "Campo adress obligatorio"
                }
            }
        },
        city: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty:{
                    msg: "El campo city no puede estar vacío"
                },
                notNull:{
                    msg: "Campo city obligatorio"
                }
            }
        },
        postalCode: {
            type: DataTypes.STRING(6),
            allowNull: false,
            validate: {
                notEmpty:{
                    msg: "El campo postalCode no puede estar vacío"
                },
                notNull:{
                    msg: "Campo postalCode obligatorio"
                }
            }
        }
    }, {
        sequelize,
        tableName: 'customers',
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
