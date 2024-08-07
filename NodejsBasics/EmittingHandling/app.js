let events=require("events");
let user=require('./user');
// let myevent=new user(); this is the instence of user from the user module  
let myevent=new events.EventEmitter(); // this is the instance of the event class 
myevent.on('user2',(name,id)=>{
    console.log('new user is created ');
    console.log(`The new user ${name} with the id ${id} is created `);
    
});
myevent.on('todelet',(name,id)=>{
    console.log(`the user ${name} with the ${id} is requesting to delet the data `);
})
myevent.emit('user2','Kiran',110);
myevent.emit('todelet','Abhi',202);
