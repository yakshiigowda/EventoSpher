const express=require("express");
const cores =require("cors"); // sometime it will give error due to the without installation so npm install cors
const app=express();
const PORT=5000;
app.use(cores())
app.use(express.json());
app.post("/api/login",(req,res)=>{
    const {username,password}=req.body;

    if(username=="rama" && password=="1234"){
     res.status(200).json({message:"login successful"})
    }
    else{
        res.status(401).json({messge:"invalid username or password"})
    }
})