module.exports = (app, upload) => {

    const router = require("express").Router();
    const controller = require("../controllers/front/contact-controller.js");
    
    router.post("/", controller.sendEmail);
    
    app.use('/api/front/contact', router);
};