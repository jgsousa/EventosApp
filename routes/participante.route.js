module.exports = function (passport) {
    var express = require('express');
    var router = express.Router();
    var participante = require('../models/participante.server.model.js');

    var isAuthenticated = function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.statusCode = 401;
        res.setHeader('WWW-Authenticate', 'Basic realm="Eventos Server"');
        res.end('Unauthorized');
    };

    router.get('/', function (req, res, next) {
        participante.getAllParticipantes(function (err, docs) {
            res.json(docs);
        });

    });

    router.get('/validate', function (req, res, next) {
        participante.getAllParticipantes(function (err, docs) {
            for (var i = 0; i < docs.length; i++){
                var user = docs[i];
                if (user.username == req.query.username && user.pin == req.query.pin){
                    res.json(user);
                    return;
                }
            }
            res.status(403).send({error:'Username ou PIN incorreto '});
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

    router.put('/:id', isAuthenticated, function (req, res, next) {
        var obj = req.body;
        participante.updateParticipante(obj, function (err, docs) {
            res.send("ok");
        });
    });

    router.delete('/:id', isAuthenticated, function (req, res, next) {
        var id = req.params.id;
        participante.deleteForId(id, function (err, docs) {
            res.send("ok");
        });
    });

    return router;
};