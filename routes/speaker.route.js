module.exports = function (passport) {
    var express = require('express');
    var router = express.Router();
    var speaker = require('../models/speaker.server.model.js');

    router.get('/', function (req, res, next) {
        speaker.getAllSpeakers(function (err, docs) {
            res.json(docs);
        });

    });

    router.post('/create', function (req, res, next) {
        speaker.createSpeaker(req.body, function (err, docs) {
            res.send("ok");
        });
    });

    router.get('/:id', function (req, res, next) {
        var id = req.params.id;
        speaker.getSpeakerForId(id, function (err, docs) {
            res.json(docs);
        });
    });

    router.put('/:id', function (req, res, next) {
        var obj = req.body;
        speaker.updateSpeaker(obj, function (err, docs) {
            res.send("ok");
        });
    });

    router.delete('/:id', function (req, res, next) {
        var id = req.params.id;
        speaker.deleteForId(id, function (err, docs) {
            res.send("ok");
        });
    });

    return router;
};