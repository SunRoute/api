// ARRANCA LA LIBRERÍA SEQUELIZE Y HACE LA CONEXIÓN A LA BASE DE DATOS. Sequelize LLAMA A LA LIBRERÍA Y sequelize A LA BASE DE DATOS Y DESPUÉS init-models ARRANCA TODOS LOS MODELOS.
// db SERÍA UN ARRAY DE OBJETOS

'use strict';

const dotenv = require('dotenv').config();
const Sequelize = require('sequelize');
const process = require('process');
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const db = {};

const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    
    host: process.env.DATABASE_HOST,
    dialect: "mysql",

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.sequelize.sync().then(() => {
    console.log("Sincronizado con la base de datos.");
}).catch((err) => {
    console.log("Fallo al sincronizar con la base de datos: " + err.message);
});

module.exports = db;



// ESTE ES EL CÓDIGO QUE GENERA AUTOMÁTICAMENTE TRAS EL COMANDO> npx sequelize init

// 'use strict';

// const fs = require('fs');
// const path = require('path');
// const Sequelize = require('sequelize');
// const process = require('process');
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.json')[env];
// const db = {};

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;
