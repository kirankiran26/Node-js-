// event driven architecture
// event emittter ===> event listner ===> event handler 
let server =require("http");
let s1=server.createServer((request,responce)=>{
    
});
s1.listen(8000, '127.0.0.1', () => {
    console.log('The Server has started...');
});
s1.on("request",(req,rsp)=>{
    rsp.end("Hello from the server ")
}) 


// s1 is the EVENT EMITTER 
// on is the EVENT LISTNER 
// (req,rsp) is the EVENT HANDLER 