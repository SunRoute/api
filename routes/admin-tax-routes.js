module.exports = app => {

    const router = require("express").Router();
    // Router ES UNA FUNCIÓN DE EXPRESS QUE SIRVE PARA CREAR RUTAS
    const controller = require("../controllers/admin/tax-controller.js");

    router.post("/", controller.create);
    // TIPO DE LLAMADA. (SOLO LA BARRA / SERÍA LA DIRECCIÓN SIMPLE (/api/admin/taxes) Y LO QUE HAYA DETRÁS SE APLICA COMO PARÁMETRO (/api/admin/taxes/:id), )
    router.get("/", controller.findAll);  
    router.get("/:id", controller.findOne);  
    router.put("/:id", controller.update);  
    router.delete("/:id", controller.delete);
    
    app.use('/api/admin/taxes', router);
};