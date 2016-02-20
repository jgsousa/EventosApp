module.exports = function (passport) {
    var express = require('express');
    var router = express.Router();
    var sessao = require('../models/sessao.server.model.js');

    router.get('/', function (req, res, next) {
        sessao.getAllSessaos(function (err, docs) {
            res.json(docs);
        });

    });

    router.post('/create', function (req, res, next) {
        sessao.createSessao(req.body, function (err, docs) {
            res.send("ok");
        });
    });

    router.get('/:id', function (req, res, next) {
        var id = req.params.id;
        sessao.getSessaoForId(id, function (err, docs) {
            res.json(docs);
        });
    });

    router.put('/:id', function (req, res, next) {
        var obj = req.body;
        sessao.updateSessao(obj, function (err, docs) {
            res.send("ok");
        });
    });

    router.delete('/:id', function (req, res, next) {
        var id = req.params.id;
        sessao.deleteForId(id, function (err, docs) {
            res.send("ok");
        });
    });

    return router;
};