var db = require('mongoose');

var SessaoSchema = new db.Schema({
    eventoId: String,
    nome: String,
    dataInicio: Date,
    dataFim: Date,
    descricao: String,
    local:String,
    speakers: Array
});

SessaoSchema.statics.getAllSessaos = function (callback) {
    this.find({}, {}, callback);
};

SessaoSchema.statics.getSessaoForId = function (id, callback) {
    this.findOne({_id: id}, {}, callback);
};

SessaoSchema.statics.updateSessao = function (Sessao, callback) {
    this.update({_id: Sessao._id}, Sessao, {upsert: true}, callback);
};

SessaoSchema.statics.createSessao = function (Sessao, callback) {
    var u = new this(Sessao);
    u.save(callback);
};

SessaoSchema.statics.deleteForId = function (id, callback) {
    this.getSessaoForId(id, function(err, Sessao){
        Sessao.remove(callback);
    });

};

SessaoSchema.statics.getSessoesForEventoId = function (id, callback) {
    this.find({ eventoId:id }, {}, callback);

};

module.exports = db.model('sessao', SessaoSchema);