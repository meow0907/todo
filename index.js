require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const PORT = Number(process.env.PORT)||8000;
const indexRouter = require("./routes");

mongoose.connect (process.env.DB_URl).then (()=>{
    console.log("Database is connected...");
});

app.use(express.json());
app.use("/",indexRouter);

app.use((err,req,res,next)=>{
    const errMsg = err.toString()|| "something went wrong";
    res.status(500).json({msg:errMsg});
});
app.listen(PORT,()=>{
    console.log(`Application is running on port ${PORT}`);
});
