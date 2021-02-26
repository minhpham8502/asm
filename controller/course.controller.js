const CourseModel = require('../models/course')
const AccountModel = require('../models/account')
const { data, param, css } = require('jquery')
var jwt =require('jsonwebtoken')
var bcrypt = require('bcrypt');
var saltRounds = 10;




class CourseController {
    
    create(req,res){
        res.render('course/create')
    }

    detail(req,res){
        let slug = req.params.slug;
        CourseModel.find({
            slug : slug
        })
        .then(data=>{
            res.render('./course/detail',{course:data})
        })
        
    }

    index(req,res ){
        CourseModel.find({

        })
        .then(data=>{
            res.render('./course/course',{course: data})
        })
        .catch(err=>{
            res.json("loi sever")
        })
    }

    search(req,res){
        var coursename = req.body.coursename;
        var topic = req.body.topic;
        CourseModel.find({
            coursename : coursename,   
        })
        .then(data=>{
            res.render('.course/course',{course:data})
        })
    }

    create(req,res,next){
        res.render('course/create')
    }

    update(req,res){
        CourseModel.findById(req.params.id)
        .then(data=>
            res.render('course/update',{course:data})
        )
    }

    docreate(req,res){
        // var coursename = req.body.coursename;
        // var topic = req.body.topic;
        // var slug = req.body.slug
        // CourseModel.findOne({
        //     coursename : coursename,
        //     topic : topic
        // })
        // .then(data=>{
        //     if(data){
        //         res.json("da ton tai")
        //     }
        //     else{
        //         return CourseModel.create({
        //             coursename : coursename,
        //             topic : topic,
        //             slug : coursename
        //         })
        //     }
        // })
        // .then(data=>{
        //     res.redirect('/course/allcourse')
        // })
        // .catch(err=>{})
        let coursename =req.body.coursename
        var newCourse = CourseModel({
            coursename : req.body.coursename,
            topic : req.body.topic,
            slug : coursename,
            student: []
        })
        newCourse.save(function(err){
            if(err){
                console.log(err)
            }else{
                res.redirect('/course/allcourse')
            }
        })
    }

    doupdate(req,res){
        // var id1 = req.params.id
        CourseModel.updateOne({
            _id : req.params.id
        }, req.body)
        .then(()=>{
            res.redirect('/course/allcourse')
        })
    }

    delete(req,res){
        CourseModel.deleteOne({
            _id :  req.params.id
        })
        .then(()=>{
            res.redirect('/course/allcourse')
        })
    }

////////////

    addStudent(req,res){
        CourseModel.find(function(err,data){
            res.render('timhocsinh',{course:data})    
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

    doAddStudent(req,res){
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
                            res.json(data)
                        }
                    })
                
                // newStudent.save(function(err){
                //     if(err){
                //         res.json({"mess":err})
                //     }else{
                //         CourseModel.findOneAndUpdate({_id:req.body.danhsach},{$push:{student:newStudent._id}},function(err){
                //           if(err){
                //             console.log("-------------------------------------")
                //             console.log(err)
                //           }else{
                              
                //             //   res.render('./course/addstudent',{course:data})
                //             res.json('ok')
                //           }
                //       })
                //     }
                // })    

    }

    chitiet(req,res){
        let coursename = req.params.coursename
      AccountModel.find({
          coursename: coursename
      }).then(data=>{
      res.json(data)

      })
    }
            
        
    
}
module.exports = new CourseController;