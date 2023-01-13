const db = require("../../models");
const Customer = db.Customer;
const EmailService = require("../../services/email-service");

exports.sendEmail = (req, res) => {

    let email = {
        destination: req.body.email,
        subject :'Pago',
        // LA PRIMERA OPCIÓN DE content RECOGERÍA nombre, apellido Y mensaje
        // content : `${req.body.name} ${req.body.surname} ha enviado el siguiente mensaje: ${req.body.message} `,
        content : "Datos procesados. En breve recibirá una confirmación de su compra."
    }
    
    new EmailService("gmail").sendEmail(email);

    Customer.create(req.body).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Algún error ha surgido al insertar el dato."
        });
    });
}