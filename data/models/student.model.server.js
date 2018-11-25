const STUDENT_MODEL = require("../constants/models").STUDENT_MODEL;
const mongoose = require('mongoose')
const studentSchema = require('../schemas/student.schema.server').StudentSchema
const StudentModel = mongoose.model(STUDENT_MODEL, studentSchema)
module.exports = {StudentModel}

