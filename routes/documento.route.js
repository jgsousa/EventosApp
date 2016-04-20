module.exports = function (passport) {
    var express = require('express');
    var router = express.Router();
    var documento = require('../models/documento.server.model.js');
    var aws = require('aws-sdk');

    var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
    var AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
    var S3_BUCKET = process.env.S3_BUCKET;

    router.get('/', function (req, res, next) {
        documento.getAllDocumentos(function (err, docs) {
            res.json(docs);
        });

    });

    router.post('/create', function (req, res, next) {
        documento.createDocumento(req.body, function (err, docs) {
            res.json(docs);
        });
    });

    router.get('/:id', function (req, res, next) {
        var id = req.params.id;
        if (id == "sign_s3"){
            next();
        }
        documento.getDocumentoForId(id, function (err, docs) {
            res.json(docs);
        });
    });

    router.put('/:id', function (req, res, next) {
        var obj = req.body;
        documento.updateDocumento(obj, function (err, docs) {
            res.json(docs);
        });
    });

    router.delete('/:id', function (req, res, next) {
        var id = req.params.id;
        documento.deleteForId(id, function (err, docs) {
            res.json(docs);
        });
    });

    router.get('/sign_s3', function(req, res){
        aws.config.update({accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY});
        var s3 = new aws.S3();
        var s3_params = {
            Bucket: S3_BUCKET,
            Key: req.query.file_name,
            Expires: 60,
            ContentType: req.query.file_type,
            ACL: 'public-read'
        };
        s3.getSignedUrl('putObject', s3_params, function(err, data){
            if (!err) {
                var return_data = {
                    signed_request: data,
                    url: 'https://' + S3_BUCKET + '.s3.amazonaws.com/' + req.query.file_name
                };
                res.json(return_data);
            }
        });
    });

    return router;
};