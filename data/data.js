
module.exports = function () {

    const mongoose = require("mongoose");
    mongoose.connect(
        process.env.DB_URL
        , {useNewUrlParser: true}).then(result => {
        console.log("mongoose connect success !")
    }).catch(error => {
        console.log("error in mongoose connection")
        console.error(error);
    })

}
