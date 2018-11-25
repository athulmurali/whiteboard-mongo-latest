const mongoose = require('mongoose')
const TrueFalseSchema = require('./true-false.schema.server.js').TrueFalseSchema
const MultipleChoiceSchema = require('./multiple-choice.schema.server.js').MultipleChoiceSchema
const QUESTION_MODEL = require("../constants/models").QUESTION_MODEL;
module.exports =  mongoose.Schema({
    _id: Number,
    question: String,
    points: Number,
    questionType: {
        type : String,
        required : true
    },
    multipleChoice:MultipleChoiceSchema,
    trueFalse: TrueFalseSchema
}, {collection: QUESTION_MODEL})


