const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Business', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        tradingName: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty:{
                    msg: "El campo tradingName no puede estar vacío"
                },
                notNull:{
                    msg: "Campo tradingName obligatorio"
                }
            }
        },
        cif: {
            type: DataTypes.STRING(10),
            allowNull: false,
            validate: {
                notEmpty:{
                    msg: "El campo cif no puede estar vacío"
                },
                notNull:{
                    msg: "Campo cif obligatorio"
                }
            }
        },
        phone: {
            type: DataTypes.STRING(13),
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
        },
        timetable: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty:{
                    msg: "El campo timetable no puede estar vacío"
                },
                notNull:{
                    msg: "Campo timetable obligatorio"
                }
            }
        },
        openingDays: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty:{
                    msg: "El campo openingDays no puede estar vacío"
                },
                notNull:{
                    msg: "Campo openingDays obligatorio"
                }
            }
        }
    }, {
        sequelize,
        tableName: 'businesses',
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
