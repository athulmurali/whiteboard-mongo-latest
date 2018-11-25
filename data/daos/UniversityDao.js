const studentModel = require("../models/student.model.server").StudentModel
const questionModel = require("../models/question.model.server").QuestionModel
const answerModel = require("../models/answer.model.server").AnswerModel

/**
 * replaceQuestionStudentWithId
 * @param answersList
 * @returns {Promise<void>}
 */
// input :
//each dict in  answersList is expected to have an username  as the value for student

//each dict in  answersList is expected to have an username  as the value for student

//output :
// each dict will be replaced with _id of the student found in place of current student username.
// each dict will be replaced with _id of the question found in place of current question
const replaceQuestionStudentWithId = async (answersList) =>
{
    try {
        // console.log("setting values of _id of student and questions in place of question  and student username")
        return answersList.map(async (answer) => {

            const studentFound = await  studentModel.findOne({username: answer.student.toLowerCase()})
            const questionFound = await  questionModel.findOne({question: answer.question})

            if (!studentFound) {
                throw Error("Student not found for username : " + answer.student.toLowerCase())
            }


            if (!questionFound) {
                throw Error("Question not found for question : " + answer.question)
            }

            // console.debug("question id : ", questionFound._id)
            // console.debug("student  id : ", studentFound._id)


            // console.log("Answer before replacement : ")
            // console.debug(answer)
            answer.student = studentFound._id
            answer.question = questionFound._id

            // console.log("Answer after replacement : ")
            // console.debug(answer)

            return answer


        })

    }

    catch (err) {

        console.error("replaceQuestionStudentWithId : issue in finding student and question ")
        console.error(err)

    }
}


const answerQuestionsList = async (answersList) => {
    try {

        const answersWithStudentQuestionIdList = await replaceQuestionStudentWithId(answersList)
        const resolvedAnswerPromises = await  Promise.all(answersWithStudentQuestionIdList)
        // console.log("return after replacement ")
        // console.log(resolvedAnswerPromises)

        return resolvedAnswerPromises.map((answer) => {
                return answerQuestion(answer.student, answer.question, answer)
            }
        )

    }
    catch (err) {
        console.log(err)
    }

}


// createStudent(student) - inserts a student document
const createStudent = (student) => studentModel.create({...student})

// truncateDatabase() - removes all the data from the database. Note that you might need to remove documents in a particular order
const truncateDatabase = () => {
    return Promise.all([
            studentModel.deleteMany({}),
            questionModel.deleteMany({}),
            answerModel.deleteMany({}),
        ]
    )
}


//  populateDatabase() - populates the database with test data as described in a later section
const populateDatabase = async (studentQuestionAnswerList) => {
    //create users from test data
    const studentsList      = studentQuestionAnswerList.students
    const questionsList     = studentQuestionAnswerList.questions
    const answersList       = studentQuestionAnswerList.answers

    const studentListCreationResults = await Promise.all(studentsList.map((student) => createStudent(student)))
    const questionListCreationResults = await Promise.all(questionsList.map((question) => createQuestion(question)))
    const answerQuestionsCreationResults = await answerQuestionsList(answersList);


    return [...studentListCreationResults, ...questionListCreationResults, ...answerQuestionsCreationResults]
}

// deleteStudent(id) - removes student whose ID is id. Delete does not cascade
const deleteStudent = function (id) {
    return studentModel.findByIdAndRemove(id)
}

// createQuestion(question) - inserts a question document
const createQuestion = function (question) {
    return questionModel.create({...question})
}
// deleteQuestion(id) - removes question whose ID is id
const deleteQuestion = function (id) {
    return questionModel.findByIdAndRemove(id)
};

//     },
// answerQuestion(studentId, questionId, answer) - inserts an answer by student student for question question
const answerQuestion = function (studentId, questionId, answer) {
    return answerModel.create({...answer, student: studentId, question: questionId})

}


// deleteAnswer(id) - removes answer whose ID is id
const deleteAnswer = function (id) {
    return answerModel.findOneAndDelete({_id: id})
}


// findAllStudents() - retrieves all students
const findAllStudents = () => studentModel.find({})

// findStudentById(id) - retrieves a single student document whose ID is id
const findStudentById = (id) => studentModel.findById(id)

// findAllQuestions() - retrieves all questions
const findAllQuestions = () => questionModel.find({})

// findQuestionById(id) - retrieves a single question document whose ID is id
const findQuestionById = (id) => questionModel.findById(id)

// findAllAnswers() - retrieves all the answers
const findAllAnswers = () => answerModel.find({})

// findAnswerById(id) - retrieves a single answer document whose ID is id
const findAnswerById = (id) => answerModel.findById(id)

// findAnswersByStudent(studentId) - retrieves all the answers for a student whose ID is studentId
const findAnswersByStudent = (studentId) => answerModel.find({student: studentId})

// findAnswersByQuestion(questionId) - retrieves all the answers for a question whose ID is questionId
const findAnswersByQuestion = (questionId) => answerModel.find({question: questionId})


module.exports = {
     truncateDatabase, populateDatabase, deleteAnswer,
    findAllQuestions, findAllStudents, findAllAnswers, findAnswerById,findAnswersByQuestion, findAnswersByStudent,
    deleteQuestion, deleteStudent
}
