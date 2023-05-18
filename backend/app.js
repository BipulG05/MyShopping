const express = require("express");
const errorMiddleware= require('./middlware/error');
const cookiePaerser = require('cookie-parser');
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

//config 
dotenv.config({path:"backend/config/config.env"});


const app = express();

// app.use(express.json());
app.use(express.json({limit: '50mb'}));
app.use(cookiePaerser()); 
app.use(express.urlencoded({limit: '50mb'}));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({limit: '150mb', extended: false}));
app.use(fileUpload());
// app.use(express.bodyParser({limit: '50mb'}));

//Route import

const product = require('./routes/productRoutes'); 
const user = require('./routes/userRoutes');
const order = require('./routes/orderRoute');
const payment = require('./routes/paymentRoute');


app.use("/api/v1",product);
app.use('/api/v1',user);
app.use("/api/v1",order);
app.use("/api/v1",payment);


// Middleware for error
app.use(errorMiddleware);

module.exports = app