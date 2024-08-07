let server=require("http");
let fs=require("fs");
const { error } = require("console");
let s1=server.createServer((request,responce)=>{
});

// s1.on("request",(req,res)=>{
//     fs.readFile('./data.txt',(error,data)=>{  // in this redFIle method basically it reads all data at once and lodes to memory so it takes so much time 
//         if(error) {
//             res.end(error);
//         }else {
//             res.end(data);
//         }
//     })
// })

s1.on("request",(req,res)=>{
    let readbuffer=fs.createReadStream('./data.txt'); // this methon will basically reads the and writes the data in chunks 

    // to handel the error 
    readbuffer.on("error",(error)=>{
        res.statusCode(404);
        res.end("Internal error ");
    });

    // for reading 
    readbuffer.pipe(res);

    // to handel the end 
    readbuffer.on("end",()=>{
        res.end();
    });
})

s1.listen(8000,'127.0.0.1',()=>{
    console.log("The new Request is accepted ");
})