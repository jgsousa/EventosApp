var db = require('mongoose');

var EventoSchema = new db.Schema({
    name: String,
    startDate: Date,
    endDate: Date,
    descricao: String,
    sessoes: Array
});

EventoSchema.statics.getAllEventos = function (callback) {
    this.find({}, {}, callback);
};

EventoSchema.statics.getEventoForId = function (id, callback) {
    this.findOne({_id: id}, {}, callback);
};

EventoSchema.statics.updateEvento = function (Evento, callback) {
    this.update({_id: Evento._id}, Evento, {upsert: true}, callback);
};

EventoSchema.statics.createEvento = function (Evento, callback) {
    var u = new this(Evento);
    u.save(callback);
};

EventoSchema.statics.deleteForId = function (id, callback) {
    this.getEventoForId(id, function(err, Evento){
        Evento.remove(callback);
    });

};

module.exports = db.model('evento', EventoSchema);