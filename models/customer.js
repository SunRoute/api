const Sequelize = require('sequelize');
const emailValidator = require('deep-email-validator')

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
            allowNull: false,
            validate: {
                isEmail: true,
                customValidator(value) {
                    return emailValidator.validate(value).then((data) => {
                        if(data.valid == false){
                            console.log(data);
                            if(data.reason == 'typo' || data.reason == 'mx' || data.reason == 'smtp') {
                                throw new Error("Email incorrecto, verifique que está bien escrito");
                            }
                            if(data.reason == 'disposable') {
                                throw new Error("Email incorrecto, no se permiten emails temporales");
                            }
                        }
                    })
                },
                notEmpty:{
                    msg: "El campo email no puede estar vacío"
                },
                notNull:{
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
