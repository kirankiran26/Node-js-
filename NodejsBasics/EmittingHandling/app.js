let events=require("events");
const newevent=new events.EventEmitter();
newevent.on('usercreated',()=>{
    console.log("The new event is created ");
    
})
newevent.emit('usercreated');