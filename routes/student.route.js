var express = require('express');
var CourseModel = require('../models/course'); 
var studentRoute = express.Router();
let {checkAuth,checkAdmin } = require('../middleware/index')
const { isEmail } = require('../middleware/index');

const studentController = require('../controller/student.controller');

studentRoute.get('/addStudent',studentController.addStudent)
studentRoute.post('/doAddStudent', isEmail,studentController.doAddStudent)

module.exports = studentRoute