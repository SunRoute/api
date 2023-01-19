const fs = require('fs');
const { getDefaultSettings } = require('http2');
const path = require('path');
const sharp = require('sharp');
const db = require("../models");
const imageResize = require('../models/image-resize');
const ImageOriginal = db.ImageOriginal;
const ImageSetting = db.ImageSetting;
const ImageResize = db.ImageResize;

module.exports = class ImageService {

    constructor(entity, entityId) {
        this.entity = entity;
        this.entityId = entityId;
    }

    uploadImage = images => {

        for (let key in images) {


            images[key].forEach(image => {

                if(image.fieldname.includes('[]')){
                    image.fieldname = image.fieldname.replace('[]', '');
                }
               
                let oldPath = path.join(__dirname, `../storage/tmp/${image.originalname}`);
                let newPath = path.join(__dirname, `../storage/images/${this.entity}/${this.entityId}/${image.fieldname}/original/${image.originalname}`);    
                let newDir = path.dirname(newPath);

                fs.mkdir(newDir, { recursive: true }, (err) => {

                    if (err) throw err;

                    fs.rename(oldPath, newPath, (err) => {
                        if (err) throw err;
                    })
               
                    /* Registrar en la tabla image_originals que se ha guardado una imagen */

                    sharp(newPath)
                    .metadata()
                    .then(metadata => {

                        ImageOriginal.create(
                            {
                                path: `/storage/images/${this.entity}/${this.entityId}/${image.fieldname}/original/${image.originalname}`,
                                languageAlias: 'es',
                                entity: this.entity,
                                entityKey: this.entityId,
                                filename: image.originalname,
                                content: image.fieldname,
                                mimeType: image.mimetype,
                                sizeBytes: image.size,
                                widthPx: metadata.width,
                                heightPx: metadata.height
                            }
                        )
                    });


                    if (!fs.existsSync(path.join(__dirname,  `../storage/images/${this.entity}/${this.entityId}/${image.fieldname}/thumbnail`))){
                        fs.mkdirSync(path.join(__dirname,  `../storage/images/${this.entity}/${this.entityId}/${image.fieldname}/thumbnail`));  
                    }

                    if (!fs.existsSync(path.join(__dirname,  `../storage/images/${this.entity}/${this.entityId}/${image.fieldname}/mobile`))){
                        fs.mkdirSync(path.join(__dirname,  `../storage/images/${this.entity}/${this.entityId}/${image.fieldname}/mobile`));
                    }

                    if (!fs.existsSync(path.join(__dirname,  `../storage/images/${this.entity}/${this.entityId}/${image.fieldname}/desktop`))){
                        fs.mkdirSync(path.join(__dirname,  `../storage/images/${this.entity}/${this.entityId}/${image.fieldname}/desktop`));    
                    }

                    /* Previo a realizar el redimensionamiento de imágenes hay que consultar en image_settings todas las redimensiones que hay que hacer para la 
                    entity e image.fieldname (el campo "content") dados */

                    ImageSetting.findAll({where: {
                        entity: this.entity,
                        content: image.fieldname,
                        
                    }}).then( settings => {

                        console.log(settings);

                        /* Bucle para redimensionar las imágenes */                       
                            
                        settings.forEach(setting => {

                            sharp(newPath)
                            .resize(setting.widthPx, setting.heightPx)
                            .toFormat(setting.extensionConversion)
                            .toFile(path.join(__dirname, `../storage/images/${this.entity}/${this.entityId}/${image.fieldname}/${setting.grid}/${path.parse(image.filename).name}.${setting.extensionConversion}`))
                            .then( imageResize => {
                            //     /* Registrar en la tabla image_resizes que se ha guardado una imagen redimensionada */
                                    ImageResize.create(
                                        {
                                            imageOriginalId: imageOriginal.id,
                                            imageSettingsId: setting.id,
                                            title: 's',
                                            alt: 's',
                                            path: `/storage/images/${this.entity}/${this.entityId}/${image.fieldname}/${setting.grid}/${path.parse(image.filename).name}.${setting.extensionConversion}`,
                                            languageAlias: 'es',
                                            entity: this.entity,
                                            entityKey: this.entityId,
                                            filename: image.filename,
                                            content: setting.content,
                                            mimeType: `image/${imageResize.format}`,
                                            grid: setting.grid,
                                            sizeBytes: imageResize.size,
                                            widthPx: setting.widthPx,
                                            heightPx: setting.heightPx,
                                            quality: setting.quality
                                        }
                            )
                                console.log(`La imagen ${image.originalname} ha sido redimensionada`);
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                        });
                    });
                });
            });
        }
    }
}