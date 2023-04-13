const app = require("./app");
const dotenv = require('dotenv');
const connectDatabase = require('./config/database')
const cloudinary = require('cloudinary')
 
//handeling uncaught exception
process.on("uncaughtException",(err) =>{
    console.log(`Error:${err.messagee}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
})



//config
dotenv.config({path:"backend/config/config.env"});

//Connection to database
connectDatabase()

cloudinary.config({
    cloud_name:process.env.CLOUDDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDDINARY_API_SECRET
});


const server = app.listen(process.env.PORT,()=>{
    console.log(`server is working on http://localhost:${process.env.PORT}`)
});
 
// unhandlle promise rejuction
process.on("unhandledRejection",err=>{
    console.log(`Error:${err.messagee}`);
    console.log(`Shutting down thee server due to Unhandle Promise Rejection`)
    server.close(()=>{
        process.exit(1);
    });
}); 