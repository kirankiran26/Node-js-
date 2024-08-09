const { count } = require('console');
const express = require('express');
const fs = require('fs');
let movieslist=JSON.parse(fs.readFileSync('./Moviesdata.json'));
const app=express();
app.get('/api/movies',(req,res)=>{
   res.status(200);
   res.json({
    status:"success",
    count:movieslist.length,
    data:{
        movieslist:movieslist
    }
   })
})
app.listen(3000,()=>{
    console.log("The server has started...");
});