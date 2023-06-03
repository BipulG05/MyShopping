const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    updateBy:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true,
    },
    subCategory:[{
        name:{
            type: String,
            required: true,
        },
        createdAt:{
            type:Date,
            default:Date.now,
        },
        updateBy:{
            type:mongoose.Schema.ObjectId,
            ref:'User',
            required:true,
        }
    }],
    createdAt:{
        type:Date,
        default:Date.now,
    }
})

module.exports = mongoose.model("Category",categorySchema);