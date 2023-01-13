const express=require("express");
const mongoose=require("mongoose");
const morgan=require("express");
const bodyParser=require("body-parser");
const cors=require("cors");
const {readdirSync}=require('fs');
require("dotenv").config();

//App
const app=express();

//Db
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify:false,
    useUnifiedTopology: true
})
try{
  console.log("DB connected")
}catch(err){
  console.log("Db connection error");
}

//Middleware
app.use(bodyParser.json({limit: '5mb'}));
app.use(morgan("dev"));
app.use(cors());

//Routes Middleware
readdirSync("./routes").map((r)=>app.use('/api',require("./routes/"+ r)));

//port
const port=process.env.PORT ||8000;
app.listen(port,()=>{
 console.log(`app is running in this ${port}`);
})

