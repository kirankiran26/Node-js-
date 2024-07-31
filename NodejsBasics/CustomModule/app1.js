let server=require("http");
let fs=require("fs");
let sum=require('./app2');
let s1=server.createServer((request,responce)=>{
    responce.end(sum(10,2))
});
s1.listen(8000,"127.0.0.1",()=>{
    console.log("The Server has started...");
})