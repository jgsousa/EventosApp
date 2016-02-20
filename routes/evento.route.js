module.exports = function (passport) {
    var express = require('express');
    var router = express.Router();
    var evento = require('../models/evento.server.model.js');

    router.get('/', function (req, res, next) {
        evento.getAllEventos(function (err, docs) {
            res.json(docs);
        });

    });

    router.post('/create', function (req, res, next) {
        evento.createEvento(req.body, function (err, docs) {
            res.send("ok");
        });
    });

    router.get('/:id', function (req, res, next) {
        var id = req.params.id;
        evento.getEventoForId(id, function (err, docs) {
            res.json(docs);
        });
    });

    router.put('/:id', function (req, res, next) {
        var obj = req.body;
        evento.updateEvento(obj, function (err, docs) {
            res.send("ok");
        });
    });

    router.delete('/:id', function (req, res, next) {
        var id = req.params.id;
        evento.deleteForId(id, function (err, docs) {
            res.send("ok");
        });
    });

    return router;
};