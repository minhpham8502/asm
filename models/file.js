var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.set('useCreateIndex', true);


var picSchema= new mongoose.Schema({
    filePath:String,
    nameFile : String
})

var picModel = mongoose.model('file',picSchema);

module.exports = picModel