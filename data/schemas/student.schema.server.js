
const STUDENT_MODEL = require("../constants/models").STUDENT_MODEL;
const UserSchema  = require('./user.schema.server')

const StudentSchema =  UserSchema({
     gradYear       :   Number,
     scholarship    :   Number

}, {collection: STUDENT_MODEL})

module.exports = {StudentSchema}
