const fs=require('fs');
let data=fs.readFileSync('./files/text1.txt',"utf-8");
console.log(data);