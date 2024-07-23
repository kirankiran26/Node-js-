// TO print the output

console.log("Hii");
console.log("How r u  ?");


// TO take the output from user 

const readline=require('readline');
let rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout,
});
rl.question("What is  ur name",(fname)=>{
    console.log("You name is "+ fname);
    rl.close();
})
rl.on("close",()=>{
    console.log("Interface is Done ");
    process.exit(0);
})
