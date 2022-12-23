module.exports = app => {

    const router = require("express").Router();
    // Router ES UNA FUNCIÓN DE EXPRESS QUE SIRVE PARA CREAR RUTAS
    const authJwt  = require("../middlewares/auth-jwt.js");
    const controller = require("../controllers/admin/tax-controller.js");

    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    
    // TIPO DE LLAMADA. (SOLO LA BARRA / SERÍA LA DIRECCIÓN SIMPLE (/api/admin/taxes) Y LO QUE HAYA DETRÁS SE APLICA COMO PARÁMETRO (/api/admin/taxes/:id), )
    router.post("/", [authJwt.verifyUserToken], controller.create);
    router.get("/", [authJwt.verifyUserToken], controller.findAll);  
    router.get("/:id", [authJwt.verifyUserToken], controller.findOne);  
    router.put("/:id", [authJwt.verifyUserToken], controller.update);  
    router.delete("/:id", [authJwt.verifyUserToken], controller.delete);
    
    app.use('/api/admin/taxes', router);
};