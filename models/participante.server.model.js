var db = require('mongoose');

var ParticipanteSchema = new db.Schema({
    eventoId: String,
    nome: String,
    empresa: String,
    headline: String,
    perfilLinkedIn: String,
    memberId:{ type:String, unique:true},
    pictureUrl:String,
    username: String,
    pin: Number,
    qrcode: String,
    sessoes: Array
});

ParticipanteSchema.statics.getAllParticipantes = function (callback) {
    this.find({}, {}, callback);
};

ParticipanteSchema.statics.getParticipanteForId = function (id, callback) {
    this.findOne({_id: id}, {}, callback);
};

ParticipanteSchema.statics.updateParticipante = function (Participante, callback) {
    this.update({_id: Participante._id}, Participante, {upsert: true}, callback);
};

ParticipanteSchema.statics.createParticipante = function (Participante, callback) {
    var u = new this(Participante);
    u.save(callback);
};

ParticipanteSchema.statics.deleteForId = function (id, callback) {
    this.getParticipanteForId(id, function(err, Participante){
        Participante.remove(callback);
    });

};

module.exports = db.model('participante', ParticipanteSchema);