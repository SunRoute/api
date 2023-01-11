exports.sendEmail = (req, res) => {

    let email = {
        subject :'Nuevo mensaje',
        content : `${req.body.name} ${req.body.surname} ha enviado el siguiente mensaje: ${req.body.message} `
    }
    
    const EmailService = require("../../services/email-service");
    new EmailService("gmail").sendEmail(email);

    res.status(200).send("ok");
}