let fs=require("fs");
console.log("The server has started ");


// stores in 2nd phase 
fs.readFile('./inputdata.txt',()=>{
    console.log("Reading from the file is completed successsfully ");

    //stores in 1dt phase  
    setTimeout(()=>{
        console.log("This  is from the Time out from inside  ");
        
    });

    // since the excutioni is in 2nd phase after that it will excute the 3rd phase that is 3rd after that it will 1st

    //3rd phase 
    setImmediate(()=>{console.log("This is from the setimmediate from inside  ");
        process.nextTick(()=>{
            console.log("This is from the nextTick ");
            
        })
});

    
    
})

setTimeout(()=>{
    console.log("This is from the setInterval outside ");
    
},0);


setImmediate(()=>{console.log("This is from the setimmediate outside  ");
});

console.log("The server is ended");


