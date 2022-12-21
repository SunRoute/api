const db = require("../../models");
const ImageOriginal = db.ImageOriginal;
const Op = db.Sequelize.Op;

// MÉTODO POST
exports.create = (req, res) => {
    
    if (!req.body.path || !req.body.languageAlias || !req.body.entity || !req.body.entityKey || !req.body.filename || !req.body.content || !req.body.mimeType || !req.body.sizeBytes || !req.body.widthPx || !req.body.heightPx) {
        res.status(400).send({
            message: "Faltan campos por rellenar."
        });

        return;
    }

    const imageOriginal = {
        path: req.body.path,
        languageAlias: req.body.languageAlias,
        entity: req.body.entity,
        entityKey: req.body.entityKey,
        filename: req.body.filename,
        content: req.body.content,
        mimeType: req.body.mimeType,
        sizeBytes: req.body.sizeBytes,
        widthPx: req.body.widthPx,
        heightPx: req.body.heightPx   
    };

    ImageOriginal.create(imageOriginal).then(data => {
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

    if(req.query.entity)
        whereStatement.entity= {[Op.substring]: req.query.entity};    

    let condition = Object.keys(whereStatement).length > 0 ? {[Op.and]: [whereStatement]} : {};
    ImageOriginal.findAll({ where: condition }).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Algún error ha surgido al recuperar los datos."
        });
    });
};

exports.findOne = (req, res) => {

    const id = req.params.id;
    ImageOriginal.findByPk(id).then(data => {
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

    ImageOriginal.update(req.body, {
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

    ImageOriginal.destroy({
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