const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Book', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty:{
                    msg: "El campo title no puede estar vacío"
                },
                notNull:{
                    msg: "Campo name obligatorio"
                }
            }
        },
        author: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty:{
                    msg: "El campo author no puede estar vacío"
                },
                notNull:{
                    msg: "Campo name obligatorio"
                }
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty:{
                    msg: "El campo description no puede estar vacío"
                },
                notNull:{
                    msg: "Campo description obligatorio"
                }
            }
        },
        isbn: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty:{
                    msg: "El campo isbn no puede estar vacío"
                },
                notNull:{
                    msg: "Campo isbn obligatorio"
                }
            }
        },
        pageCount: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            validate: {
                isInt:{
                    msg: "pageCount debe ser un número"
                },
                notEmpty:{
                    msg: "El campo pageCount no puede estar vacío"
                },
                notNull:{
                    msg: "Campo pageCount obligatorio"
                }
            }
        },
        publishedDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                isDate:{
                    msg: "publishedDate debe ser una fecha"
                },
                notEmpty:{
                    msg: "El campo publishedDate no puede estar vacío"
                },
                notNull:{
                    msg: "Campo publishedDate obligatorio"
                }
            }
        }
    }, {
        sequelize,
        tableName: 'books',
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