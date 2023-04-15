const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required:true,
        },
        email:{
            type:String,
            requires:true,
            unique: true ,
        },
        password:{
            type:String,
            requires:true
        }
    }
)




const User = mongoose.model('User', userSchema)

module.exports = User ;