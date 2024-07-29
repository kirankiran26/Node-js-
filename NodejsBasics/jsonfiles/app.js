let server = require("http");
let fs=require("fs");
let indexfile=fs.readFileSync('./indedx.html',"utf-8");
let s1=server.createServer((request,responce)=>{
    let path=request.url;
    if(path==="/" || path =="/home") {
        responce.end(indexfile.replace('{{%content%}}','Home'));
    }
    else if (path==="/about") {
        responce.end(indexfile.replace('{{%content%}}','About ' ));
    }
    else {
        responce.end("404")
    }
});
s1.listen(8000,"127.0.0.1",()=>{
    console.log("The server is srarted...");
})