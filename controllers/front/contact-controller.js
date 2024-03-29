const db = require("../../models");
const Contact = db.Contact;
const EmailService = require("../../services/email-service");

exports.sendEmail = (req, res) => {

    let email = {
        subject :'Nuevo mensaje',
        // LA PRIMERA OPCIÓN DE content RECOGERÍA nombre, apellido Y mensaje
        // content : `${req.body.name} ${req.body.surname} ha enviado el siguiente mensaje: ${req.body.message} `,
        content : req.body.message
    }
    
    new EmailService("gmail").sendEmail(email);

    Contact.create(req.body).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Algún error ha surgido al insertar el dato."
        });
    });
}