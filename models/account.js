var mongoose = require("mongoose");
//const { stringify } = require("querystring");

mongoose.connect('mongodb://localhost/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

const Schema = mongoose.Schema;
const AccountSchema = new Schema({
    username: String,
    password: String,
    email : String,
    slug : String,
    role : {
        type : String,
        default : "student"
    },
    // fileSummit:[{
    //     type : mongoose.Schema.Types.ObjectId
    // }]   
},
{
    collection: 'account'
});

var AccountModel = mongoose.model('account', AccountSchema);
module.exports = AccountModel