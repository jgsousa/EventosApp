var db = require('mongoose');

var DocumentoSchema = new db.Schema({
    eventoId: String,
    sessaoId: String,
    descricao: String,
    fileUrl:Object
});

DocumentoSchema.statics.getAllDocumentos = function (callback) {
    this.find({}, {}, callback);
};

DocumentoSchema.statics.getDocumentoForId = function (id, callback) {
    this.findOne({_id: id}, {}, callback);
};

DocumentoSchema.statics.getDocumentoForEvento = function (id, callback) {
    this.find({eventoId: id}, {}, callback);
};

DocumentoSchema.statics.updateDocumento = function (Documento, callback) {
    this.update({_id: Documento._id}, Documento, {upsert: true}, callback);
};

DocumentoSchema.statics.createDocumento = function (Documento, callback) {
    var u = new this(Documento);
    u.save(callback);
};

DocumentoSchema.statics.deleteForId = function (id, callback) {
    this.getDocumentoForId(id, function(err, Documento){
        Documento.remove(callback);
    });

};

module.exports = db.model('Documento', DocumentoSchema);