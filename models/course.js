var mongoose = require('mongoose')
var slug = require('mongoose-slug-generator');

mongoose.connect('mongodb://localhost/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.set('useCreateIndex', true);

const Schema = mongoose.Schema;
const CourseSchema = new Schema({ 
    coursename : String,
    topic : String,
    slug: {type:String, slug: "coursename", unique:true },
    student : [{
        type : mongoose.Schema.Types.ObjectId
    }]
},{
    collection : 'course',
    timestamps : true
});

var CourseModel = mongoose.model('course', CourseSchema)
module.exports = CourseModel