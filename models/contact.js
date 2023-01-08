const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Contact', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        fingerprintId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'fingerprints',
                key: 'id'
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
        tableName: 'contacts',
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
                name: "fingerprintId",
                using: "BTREE",
                fields: [
                    { name: "fingerprintId" },
                ]
            },
        ]
    });
};
