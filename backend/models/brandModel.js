const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    countryOfOrigin:{
        type:String,
        required:true
    },
    contactDetails:{
        address:{
            type:String,
            required:true
        },
        email:{
            type:String,
        },
        phoneNo:{
            type:Number,
        }
    },
    updateBy:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
})

module.exports = mongoose.model("Brand",brandSchema);