var db = require('mongoose');

var SpeakerSchema = new db.Schema({
    eventoId: String,
    nome: String,
    empresa: String,
    descricao: String,
    headline: String,
    linkedInProfile: String
});

SpeakerSchema.statics.getAllSpeakers = function (callback) {
    this.find({}, {}, callback);
};

SpeakerSchema.statics.getSpeakerForId = function (id, callback) {
    this.findOne({_id: id}, {}, callback);
};

SpeakerSchema.statics.updateSpeaker = function (Speaker, callback) {
    this.update({_id: Speaker._id}, Speaker, {upsert: true}, callback);
};

SpeakerSchema.statics.createSpeaker = function (Speaker, callback) {
    var u = new this(Speaker);
    u.save(callback);
};

SpeakerSchema.statics.deleteForId = function (id, callback) {
    this.getSpeakerForId(id, function(err, Speaker){
        Speaker.remove(callback);
    });

};

module.exports = db.model('speaker', SpeakerSchema);