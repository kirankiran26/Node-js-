const { error } = require('console');
const fs=require('fs');
fs.readFile('./files/Asynkinput.txt','utf-8',(error1,data)=>{
    console.log(data);
})
console.log("HIi ");

// in this the hii will excute brfore the data it will not wait 

fs.writeFile('./files/asynkwrite.txt',"Writing asynk write function",()=>{
    console.log("Done with writing ");
})