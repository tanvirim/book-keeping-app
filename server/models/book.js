const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
    category: {
        type:String,
        required:[true,'book catagory is required']
    },
    author: {
        type: String,
        require:true
    },
    title: {
        type: String,
        require:true
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},
{
    timestamps:true
})

const Book = mongoose.model('Book', bookSchema)

module.exports = Book ;