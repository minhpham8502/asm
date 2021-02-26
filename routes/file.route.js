var express = require('express')
var fileRouter = express.Router()
var fileModel = require('../models/file')
var multer =  require('multer');
var bodyParser = require('body-parser');
let {checkAuth } = require('../middleware/index')

fileRouter.use(checkAuth)
var path = require('path');


var pathh = path.resolve(__dirname,'public');
fileRouter.use(express.static(pathh));
fileRouter.use(bodyParser.urlencoded({extended:false}));

var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./public/uploads')
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})
var upload = multer({storage:storage})

fileRouter.get('/',(req,res)=>{
    fileModel.find((err,data)=>{
        if(err){
            console.log(err)
        }
        else if(data.length>0){
            res.render('file/uploadFile',{data:data})
        }
        else{
            res.render('file/uploadFile',{data:{data}})
        }
    })
})

fileRouter.post('/upload',upload.single('filePath'),(req,res)=>{
    var x = 'uploads/'+req.file.originalname;
    var y = req.file.originalname;
    
    var temp = new fileModel({
        filePath:x,
        nameFile : y
    })
  
    temp.save((err,data)=>{
        if(err){
            console.log(err)
        }
        res.redirect('/file')
    })
})

fileRouter.get('/download/:id',(req,res)=>{
    fileModel.find({_id:req.params.id},(err,data)=>{
         if(err){
             console.log(err)
         }
         else{
             var x= __dirname+'/public/'+data[0].filePath;
             res.download(x)
         }
    })
})

module.exports = fileRouter