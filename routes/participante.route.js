module.exports = function (passport) {
    var express = require('express');
    var router = express.Router();
    var participante = require('../models/participante.server.model.js');

    router.get('/', function (req, res, next) {
        participante.getAllParticipantes(function (err, docs) {
            res.json(docs);
        });

    });

    router.post('/create', function (req, res, next) {
        participante.createParticipante(req.body, function (err, docs) {
            res.send("ok");
        });
    });

    router.get('/:id', function (req, res, next) {
        var id = req.params.id;
        participante.getParticipanteForId(id, function (err, docs) {
            res.json(docs);
        });
    });

    router.put('/:id', function (req, res, next) {
        var obj = req.body;
        participante.updateParticipante(obj, function (err, docs) {
            res.send("ok");
        });
    });

    router.delete('/:id', function (req, res, next) {
        var id = req.params.id;
        participante.deleteForId(id, function (err, docs) {
            res.send("ok");
        });
    });

    return router;
};