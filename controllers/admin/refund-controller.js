const db = require("../../models");
const Refund = db.Refund;
const Op = db.Sequelize.Op;

// MÉTODO POST
exports.create = (req, res) => {
    
    if (!req.body.paymentMethodId || !req.body.reference || !req.body.totalPrice || !req.body.basePrice || !req.body.totalTaxPrice) {
        res.status(400).send({
            message: "Faltan campos por rellenar."
        });

        return;
    }

    const refund = {
        shoppingCartId: req.body.shoppingCartId,
        customerId: req.body.customerId,
        paymentMethodId: req.body.paymentMethodId,
        reference: req.body.reference,
        totalPrice: req.body.totalPrice,
        basePrice: req.body.basePrice,
        totalTaxPrice: req.body.totalTaxPrice
    };

    Refund.create(refund).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Algún error ha surgido al insertar el dato."
        });
    });
};

// MÉTODO GET
exports.findAll = (req, res) => {

    let whereStatement = {};
    
    if(req.query.paymentMethodId)
        whereStatement.paymentMethodId = {[Op.substring]: req.query.paymentMethodId};

    let condition = Object.keys(whereStatement).length > 0 ? {[Op.and]: [whereStatement]} : {};
    Refund.findAll({ where: condition }).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Algún error ha surgido al recuperar los datos."
        });
    });
};

exports.findOne = (req, res) => {

    const id = req.params.id;
    Refund.findByPk(id).then(data => {
        if (data) {
            res.status(200).send(data);
        } else {
            res.status(404).send({
                message: `No se puede encontrar el elemento con la id=${id}.`
            });
        }

    }).catch(err => {
        res.status(500).send({
            message: "Algún error ha surgido al recuperar la id=" + id
        });
    });
};

// MÉTODO PUT
exports.update = (req, res) => {

    const id = req.params.id;

    Refund.update(req.body, {
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.status(200).send({
                message: "El elemento ha sido actualizado correctamente."
            });
        } else {
            res.status(404).send({
                message: `No se puede actualizar el elemento con la id=${id}. Tal vez no se ha encontrado el elemento o el cuerpo de la petición está vacío.`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Algún error ha surgido al actualiazar la id=" + id
        });
    });
};

// MÉTODO DELETE
exports.delete = (req, res) => {

    const id = req.params.id;

    Refund.destroy({
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.status(200).send({
                message: "El elemento ha sido borrado correctamente"
            });
        } else {
            res.status(404).send({
                message: `No se puede borrar el elemento con la id=${id}. Tal vez no se ha encontrado el elemento.`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Algún error ha surgido al borrar la id=" + id
        });
    });
};