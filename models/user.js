const e = require('express');
const Sequelize = require('sequelize');
const useBcrypt = require('sequelize-bcrypt');

module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define('User', {
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
                notNull: {
                    msg: 'Por favor, rellena el campo "Nombre".'
                }
            }
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: {
                args: true,
                msg: 'Ya existe un usuario con ese correo electrónico.'
            },
            validate: {
                notNull: {
                    msg: 'Por favor, rellena el campo "Email".'
                },
                isEmail: {
                    msg: 'Por favor, rellena el campo "Email" con un email válido.'
                }
            }
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: true
        }
    }, {
        sequelize,
        tableName: 'users',
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
                name: "email",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "email" },
                ]
            },
        ]
    });

    useBcrypt(User);
    // ESTA LIBRERÍA DETECTA EL CAMPO PASSWORD Y LO ENCRIPTA. SE INSTALA CON EL COMANDO npm install sequelize-bcrypt.  DESPUÉS LANZAR npm audit fix --force PARA QUE SE ELIMINEN VULNERABILIDADES

    return User;
};