var express = require('express');
var CourseModel = require('../models/course'); 
var courseRoute = express.Router();
let {checkAuth,checkAdmin } = require('../middleware/index')
const { isEmail } = require('../middleware/index');

const courseController = require('../controller/course.controller');
// tương tác với course

// courseRoute.post('/course/chitiethoc', courseController.chitiethocsinh)


////
courseRoute.get('/allcourse', courseController.index)
courseRoute.get('/:slug', courseController.detail)

courseRoute.post('/course/search', courseController.search)

// courseRoute.use(checkAuth);
// courseRoute.use(checkAdmin);

courseRoute.get('/course/update:id',courseController.update)
courseRoute.get('/course/create',courseController.create)
courseRoute.get('/course/delete:id',courseController.delete)

courseRoute.post('/doupdate:id', courseController.doupdate)
courseRoute.post('/doCreate', courseController.docreate)


// // tương tác với học sinh
// courseRoute.get('/course/addStudent',courseController.addStudent)
// courseRoute.post('/course/doAddStudent', isEmail,courseController.doAddStudent)
courseRoute.get('/allStudent/:slug',courseController.allstudent)


module.exports = courseRoute;