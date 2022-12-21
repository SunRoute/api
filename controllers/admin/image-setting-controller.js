const db = require("../../models");
const ImageSetting = db.ImageSetting;
const Op = db.Sequelize.Op;

// MÉTODO POST
exports.create = (req, res) => {
    
    if (!req.body.entity || !req.body.directory || !req.body.type || !req.body.content || !req.body.grid || !req.body.acceptedContent || !req.body.extensionConversion || !req.body.widthPx || !req.body.heightPx || !req.body.quality) {
        res.status(400).send({
            message: "Faltan campos por rellenar."
        });

        return;
    }

    const imageSetting = {
        entity: req.body.entity,
        directory: req.body.directory,
        type: req.body.type,
        content: req.body.content,
        grid: req.body.grid,
        acceptedContent: req.body.acceptedContent,
        extensionConversion: req.body.extensionConversion,
        widthPx: req.body.widthPx,
        heightPx: req.body.heightPx,
        quality: req.body.quality   
    };

    ImageSetting.create(imageSetting).then(data => {
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
    if(req.query.grid)
    whereStatement.grid= {[Op.substring]: req.query.grid};    

    let condition = Object.keys(whereStatement).length > 0 ? {[Op.and]: [whereStatement]} : {};
    ImageSetting.findAll({ where: condition }).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Algún error ha surgido al recuperar los datos."
        });
    });
};

exports.findOne = (req, res) => {

    const id = req.params.id;
    ImageSetting.findByPk(id).then(data => {
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

    ImageSetting.update(req.body, {
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

    ImageSetting.destroy({
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