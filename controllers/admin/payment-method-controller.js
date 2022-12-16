const db = require("../../models");
const PaymentMethod = db.PaymentMethod;
const Op = db.Sequelize.Op;
// db SERÍA UN ARRAY DE OBJETOS. Op ES UN OPERADOR PARA HACER LOS CONDICIONALES.

// MÉTODO POST
exports.create = (req, res) => {
    
    if (!req.body.name) {
         // DATOS OBLIGATORIOS. req.body SON TODOS LOS DATOS RECOGIDOS EN EL FORMULARIO.
        res.status(400).send({
            message: "Faltan campos por rellenar."
            // MENSAJE SI NO SE INTRODUCE NADA EN EL INPUT (! -> DIFERENTE DE). SE PUEDEN AÑADIR VARIOS -> if (!req.body.type || !req.body.category)
        });

        return;
    }

    const paymentMethod = {
        // DATOS QUE SE QUIEREN INTRODUCIR EN LA BDD
        name: req.body.name,
        visible: req.body.visible ? req.body.visible : true
    };

    PaymentMethod.create(paymentMethod).then(data => {
        // CREA UN NUEVO REGISTRO A PARTIR DE LOS DATOS (create) Y SI VA BIEN RECOGE LA RESPUESTA DE LA BASE DE DATOS (then)
        res.status(200).send(data);
    }).catch(err => {
        // SI OCURRE ALGÚN ERROR
        res.status(500).send({
            message: err.message || "Algún error ha surgido al insertar el dato."
        });
    });
};

// MÉTODO GET
exports.findAll = (req, res) => {

    let whereStatement = {};

    if(req.query.visible)
        // SI VIENE UN PARÁMETRO valid, SE CREA EL OBJETO (whereStatement.valid). ESTO ES EQUIVALENTE A HACER LA CONSULTA A LA BDD.
        whereStatement.visible = {[Op.substring]: req.query.visible};
        // EN ESTE CASO SE ESTÁ UTILIZANDO . OTRA OPCIÓN a substring ES USAR like, PERO EN ESE CASO SE CONCATENARÍA -> `%${req.query.valid}%`
    let condition = Object.keys(whereStatement).length > 0 ? {[Op.and]: [whereStatement]} : {};
    // SI whereStatement TIENE ALGO AÑADIRÍA LOS DATOS, HASTA LA LONGITUD, MEDIANTE and
    PaymentMethod.findAll({ where: condition }).then(data => {
        // MODIFICA UN REGISTRO A PARTIR DE LOS DATOS (findAll) Y SI VA BIEN RECOGE LA RESPUESTA DE LA BASE DE DATOS (then)
        res.status(200).send(data);
    }).catch(err => {
        // SI OCURRE ALGÚN ERROR
        res.status(500).send({
            message: err.message || "Algún error ha surgido al recuperar los datos."
        });
    });
};

exports.findOne = (req, res) => {

    const id = req.params.id;
    // SE RECOGE EL PARARÁMETRO QUE PASA EL USUARIO
    PaymentMethod.findByPk(id).then(data => {
    // findByPk -> ENCONTRAR POR CLAVE PRIMARIA (PRIMARY KEY)
        if (data) {
            // SI DEVUELVE UN REGISTRO
            res.status(200).send(data);
        } else {
            // SI NO DEVUELVE REGISTRO
            res.status(404).send({
                message: `No se puede encontrar el elemento con la id=${id}.`
            });
        }

    }).catch(err => {
        // SI OCURRE ALGÚN ERROR
        res.status(500).send({
            message: "Algún error ha surgido al recuperar la id=" + id
        });
    });
};

// MÉTODO PUT
exports.update = (req, res) => {

    const id = req.params.id;

    PaymentMethod.update(req.body, {
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            // CUANDO LA MODIFICACIÓN DEVUELVE 1 (CORRECTO)
            res.status(200).send({
                message: "El elemento ha sido actualizado correctamente."
            });
        } else {
            // CUANDO LA MODIFICACIÓN DEVUELVE 0 (INCORRECTO)
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

    PaymentMethod.destroy({
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