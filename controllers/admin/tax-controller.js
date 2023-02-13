const db = require("../../models");
const Tax = db.Tax;
const Op = db.Sequelize.Op;
// db SERÍA UN ARRAY DE OBJETOS. Op ES UN OPERADOR PARA HACER LOS CONDICIONALES.

// MÉTODO POST
exports.create = (req, res) => {

    Tax.create(req.body).then(data => {
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

    let page = req.query.page || 1;
    let limit = parseInt(req.query.size) || 10;
    let offset = (page - 1) * limit;

    let whereStatement = {};

    for (let key in req.query) {
        if (req.query[key] != "" && key != "page" && key != "size") {
            whereStatement[key] = {[Op.substring]: req.query[key]};
        }
    }

    let condition = Object.keys(whereStatement).length > 0 ? {[Op.and]: [whereStatement]} : {};

    Tax.findAndCountAll({
        where: condition, 
        limit: limit,
        offset: offset,
        order: [['createdAt', 'DESC']]
    })
    .then(result => {

        result.meta = {
            total: result.count,
            pages: Math.ceil(result.count / limit),
            currentPage: page
        };

        res.status(200).send(result);

    }).catch(err => {
        res.status(500).send({
            message: err.errors || "Algún error ha surgido al recuperar los datos."
        });
    });
};

exports.findOne = (req, res) => {

    const id = req.params.id;
    // SE RECOGE EL PARARÁMETRO QUE PASA EL USUARIO
    Tax.findByPk(id).then(data => {
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

    Tax.update(req.body, {
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

    Tax.destroy({
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