const ErrorHandler = require('../utils/errorhanler');

module.exports = (err,req,res,next) => { 
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server error";

    //Wrong mongodb object error
    if(err.name==="CastError"){
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message,400)
    }
    // Mongoose duplicatee key error
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} enter`
        err = new ErrorHandler(message,400)
        
    }
     // wrong jwt rror
     if(err.name === "jsonwebTokenError"){
        const message = `json web token is invalid, try again`
        err = new ErrorHandler(message,400)
        
    }
     //  jwt expire
     if(err.name === "Tokenexpirdrror"){
        const message = `json web token is expired, try again`
        err = new ErrorHandler(message,400)
        
    }

    res.status(err.statusCode).json({
        success:false,
        // error:err.stack,
        // error:err
        message:err.message,
    })
}