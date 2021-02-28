const CourseModel = require('../models/course')
const AccountModel = require('../models/account')
const { data, param, css } = require('jquery')
var jwt =require('jsonwebtoken')
var bcrypt = require('bcrypt');
var saltRounds = 10;


let addStudent = (req,res)=>{
    CourseModel.find(function(err,data){
        res.render('./student/course_student',{course:data})    
})
}
// dotimhocsinh(req,res){
//     AccountModel.find({
//         email : req.body.email,   
//     })
//     .then(data=>{
//         res.render('timhocsinh',{account:data})
        
//     })
// }

let doAddStudent=(req,res)=>{
        let username = req.body.username;
        let password = req.body.password;
        let email = req.body.email;
        let slug = req.body.slug;
        
                const salt = bcrypt.genSaltSync(saltRounds);
                const hash = bcrypt.hashSync(password, salt);
                let newStudent = AccountModel({
                    username,
                    password :hash,
                    email,
                    slug  
                })
                newStudent.save(function(err,data){
                    if(err){
                        console.log(err)
                    }else{
                        res.redirect('/student/addStudent${slug}')
                    }
                })
            }

module.exports ={
    addStudent,
    doAddStudent
}