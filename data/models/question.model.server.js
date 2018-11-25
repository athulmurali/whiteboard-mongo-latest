
const mongoose = require('mongoose')
const questionSchema = require('../schemas/question.schema.server')
const QUESTION_MODEL = require("../constants/models").QUESTION_MODEL;


const QuestionModel  = mongoose.model(QUESTION_MODEL, questionSchema)

module.exports = {QuestionModel}
