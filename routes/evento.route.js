module.exports = function (passport) {
    var express = require('express');
    var router = express.Router();
    var evento = require('../models/evento.server.model.js');
    var sessao = require('../models/sessao.server.model.js');

    var isAuthenticated = function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.statusCode = 401;
        res.setHeader('WWW-Authenticate', 'Basic realm="Tarefas Server"');
        res.end('Unauthorized');
    };

    router.get('/', function (req, res, next) {
        evento.getAllEventos(function (err, docs) {
            res.json(docs);
        });

    });

    router.post('/create', isAuthenticated, function (req, res, next) {
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

    router.put('/:id', isAuthenticated, function (req, res, next) {
        var obj = req.body;
        evento.updateEvento(obj, function (err, docs) {
            res.send("ok");
        });
    });

    router.delete('/:id', isAuthenticated, function (req, res, next) {
        var id = req.params.id;
        evento.deleteForId(id, function (err, docs) {
            res.send("ok");
        });
    });

    router.get('/:id/sessoes', function (req, res, next) {
        var id = req.params.id;
        sessao.getSessoesForEventoId(id, function (err, docs) {
            res.json(docs);
        });
    });

    return router;
};