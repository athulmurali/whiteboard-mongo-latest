
const mongoose     = require('mongoose')
const answerSchema = require('../schemas/answer.schema.server').AnswerSchema

const ANSWER_MODEL = require("../constants/models").ANSWER_MODEL;
const AnswerModel  = mongoose.model(ANSWER_MODEL, answerSchema)


module.exports = {AnswerModel}
