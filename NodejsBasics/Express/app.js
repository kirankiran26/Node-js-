const express = require('express');
let app=express();

// app.get('/',(req,res)=>{
//     res.status(200).send(`
//         <h1> Hii </h1>
//          <h1> Kiran P S  </h1>
//           <h1> Good morning  </h1>    // the text typr is text/html u can't sent other text like this 
//         `)
// })

app.get('/',(req,res)=>{
    res.status(200).json({message:'Hii',status:200});
})
app.listen(3000,(req,res)=>{
    console.log("The server has started....");
    
});