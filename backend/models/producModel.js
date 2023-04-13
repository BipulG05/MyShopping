const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Product Name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"please Enter the Description"]
    },
    ratings:{
        type:Number,
        default:0
    },
    price:{
        type:Number,
        required:[8,"Price cannot exceed 8 characters"]
    },
    images:[
        {
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }
    ],
    category:{
        type:String,
        required:[true,"Please enter product category"]
    },
    stock:{
        type:Number,
        required:[true,"please enter stocks"],
        maxLength:[4,"Stocks does not exced 4 characters"],
        default:1
    },
    numofreview:{
        type:Number,
        default:0
    },
    reviews:[{
        user:{
            type:mongoose.Schema.ObjectId,
            ref:'User',
            required:true,
        },
        name:{
            type:String,
            required:true
        },
        rating:{
            type:Number,
            required:true,
        },
        comment:{
            type:String,
            required:true
        }
    }],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true,
    },
    updateBy:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true,
    },
    creatAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("Product",productSchema)