const db = require("../../models");
const Customer = db.Customer;
const Op = db.Sequelize.Op;

// MÉTODO POST
exports.create = (req, res) => {
    
    if (!req.body.name || !req.body.price || !req.body.categoryId || !req.body.taxId) {
        res.status(400).send({
            message: "Faltan campos por rellenar."
        });

        return;
    }

    const product = {
        name: req.body.name,
        price: req.body.price,
        categoryId: req.body.categoryId,
        taxId: req.body.taxId,
        destacado: req.body.destacado ? req.body.destacado : false,
        visible: req.body.visible ? req.body.visible : true
    };

    Product.create(product).then(data => {
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

    if(req.query.destacado)
        whereStatement.destacado = {[Op.substring]: req.query.destacado};
    if(req.query.visible)
        whereStatement.visible = {[Op.substring]: req.query.visible};
    if(req.query.categoryId)
        whereStatement.categoryId = {[Op.substring]: req.query.categoryId};

    let condition = Object.keys(whereStatement).length > 0 ? {[Op.and]: [whereStatement]} : {};
    Product.findAll({ where: condition }).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Algún error ha surgido al recuperar los datos."
        });
    });
};

exports.findOne = (req, res) => {

    const id = req.params.id;
    Product.findByPk(id).then(data => {
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

    Product.update(req.body, {
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

    Product.destroy({
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