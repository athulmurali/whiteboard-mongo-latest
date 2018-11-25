
const student = require('./student.schema.server')
const question = require('./question.schema.server')
const mongoose = require("mongoose");
const QUESTION_MODEL = require("../constants/models").QUESTION_MODEL;
const STUDENT_MODEL = require("../constants/models").STUDENT_MODEL;
const ANSWER_MODEL = require("../constants/models").ANSWER_MODEL;
const AnswerSchema = mongoose.Schema({
    _id: Number,
    trueFalseAnswer: Boolean,
    multipleChoiceAnswer: Number,
    student: {type: Number, ref: STUDENT_MODEL},
    question: {type: Number, ref: QUESTION_MODEL}
}, {collection: ANSWER_MODEL})


module.exports = {AnswerSchema}
