var mongoose = require('mongoose');
var debug = require('debug')('EventosApp:server');
mongoose.connection.on('open', function (ref) {
    debug('Connected to mongoDB server.');
    debug('It has the following collections:');
    mongoose.connection.db.listCollections().toArray(function (err, names) {
        debug(names); // [{ name: 'dbname.myCollection' }]
        module.exports.Collection = names;
    });
});
if(process.env.LOCAL === 'yes'){
    mongoose.connect('mongodb://localhost/eventos');
} else {
    mongoose.connect(process.env.MONGOLAB_URI);
}
