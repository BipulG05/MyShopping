const mongoose = require('mongoose')

const connectDatabase = () =>{
    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.DB_URI,{useNewUrlParser:true,useUnifiedTopology:true}).then((data)=>{
            console.log(`Mongodb connected with server : ${data.connection.host}`);
        })
        .catch((err) =>{
            console.log(err)   
    })
}

// const connectDatabase = () =>{
//     mongoose.connect(process.env.DB_URI,()=>{ 
//         }).then((data)=>{
//             // mongoose.set('strictQuery', true);
//             console.log(`Mongodb connected with server : ${data.connection.host}`)
//         }).catch((err) =>{
//             console.log(err)
//         }) 
// }

module.exports = connectDatabase