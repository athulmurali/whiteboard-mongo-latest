import {QUIZ_WIDGET_MODEL} from "../constants/models";

const mongoose = require('mongoose')
const quizSchema = require('../schemas/quiz-widget.schema.server')
const questionWidgetSchema = mongoose.Schema({
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: QUIZ_WIDGET_MODEL
    }]
}, {collection: QUIZ_WIDGET_MODEL})
