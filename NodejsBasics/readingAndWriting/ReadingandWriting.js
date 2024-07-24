// this is how u print somthing which is other file in this file ...
const fs=require('fs');
let data=fs.readFileSync('./files/text1.txt',"utf-8");
console.log(data);

// TO print or append something to other folder we can use this mwthod 
let content="This is the content from ReadingandWriting file to op file ";
fs.writeFileSync('./files/output.txt',content);

// if the file is present it will append the content to it if it not present it will create it and add the content