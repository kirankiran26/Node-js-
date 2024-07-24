let server=require('http');
let s1=server.createServer((request,responce)=>{
    responce.end("hii from the server ")
    console.log("The new Rqueste is excuted");
});
s1.listen(8000,'127.0.0.1',()=>{
    
    console.log("The server is startd ");
})

