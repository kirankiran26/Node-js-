const express = require('express');
const app=express();
const morgon=require("morgan");

let middlware=function(req,res,next){
    console.log("This is from Middleware ");
    next()
}
app.use(middlware);
app.use(morgon("dev"))
app.use((req,res,next)=>{
    req.requestedAt=new Date().toISOString();
    next();
})
app.get('/',(req,res)=>{
   res.status(200).json({
    status:"success",
    requestedAt:req.requestedAt,
   })
});

app.listen(3000,()=>{
    console.log("The server has started...");
    
})