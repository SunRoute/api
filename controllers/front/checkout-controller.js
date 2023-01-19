const db = require("../../models");
const Customer = db.Customer;
const EmailService = require("../../services/email-service");

exports.sendEmail = (req, res) => {

    Customer.create(req.body).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        console.log(err)

        res.status(500).send({
            message: err.message || "Algún error ha surgido al insertar el dato."
        });
    });

    let emailService = new EmailService("gmail");

    let email = {
        subject :'Pago cliente',
        content : "Un cliente ha finalizado el proceso de compra."
    }

    emailService.sendEmail(email);

    let customerEmail = {
        destination: req.body.email,
        subject :'Pago',
        content : "Datos procesados. En breve recibirá una confirmación de su compra."
    }

    emailService.sendEmail(customerEmail, req.body.email);
}