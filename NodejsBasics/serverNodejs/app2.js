let server=require("http");
let fs=require('fs');
let index=fs.readFileSync('./index.html',"utf-8");
let s1=server.createServer((request,responce)=>{
    responce.end(index);
    console.log("The request is accepted ");
})
s1.listen(8000,'127.0.0.1',()=>{
    console.log("The new Request is accepted ");
})
