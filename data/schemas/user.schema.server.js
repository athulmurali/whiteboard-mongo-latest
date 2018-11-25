var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

function UserSchema(add){
    const userSchema  =   new Schema({
        _id: Number,
        username  :{
            type: String,
            required: true,
            unique : true
        },
        password  :{
            type: String,
            required: true,
            unique : true
        },
        firstName  :{
            type: String,
            required: true,
        },
        lastName  :{
            type: String,
            required: true,

        },
    })

    if(add) {
        userSchema.add(add);
    }

    return userSchema

}

module.exports= UserSchema;
