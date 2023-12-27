const express = require('express');
const app= express();
const cookieParser=require('cookie-parser');
const errorMiddleware=require('./middleware/error');
const fileupload=require('express-fileupload'
);
const bodyparser=require('body-parser');
app.use(express.json());
app.use(cookieParser())



app.use(bodyparser.urlencoded({extended:true}));
app.use(fileupload());
//route imports
const product = require('./routes/productRoute');
const user = require('./routes/userRoutes');
const order=require('.//routes/OrderRoutes')
app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order);


app.use(errorMiddleware)
module.exports=app