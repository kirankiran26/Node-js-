require('dotenv').config({ path: './config.env' }); // Load environment variables from config.env
const express = require('express');
const mongoose = require('mongoose'); 
const moviesRouter = require('./Routes/moviesRouters'); // Ensure the path is correct
const AllMovie = require('./data/Moviesdata.json'); // Import Movie model from the dedicated file
const custerr = require('./utils/customerrors');
const globelmiddlewareerror = require('./Controller/errorControler');
const userrouter=require('./Routes/usersRouter')
const app = express();

app.use(express.json());
app.use('/movies', moviesRouter);
app.use('/users',userrouter);
app.all('*', (req, res, next) => {
    const err = new custerr(`Can't find this ${req.originalUrl} on this server`, 404);
    next(err);
});

app.use(globelmiddlewareerror);

mongoose.connect(process.env.CONN_STR)
    .then(() => {
        console.log("Connection is successful...");
    });

const server = app.listen(3000, () => {
    console.log("The server has started on port 3000...");
});

process.on('unhandledRejection', (error) => {
    console.log("Unhandled rejection, shutting down...");
    server.close(() => {
        process.exit(1);
    });
});
process.on('uncaughtException',(err)=>{
    console.log(err.name,err.message);
    console.log("uncaught error occured shuting down....");
    server.close(()=>{
        process.exit(1);
    })
})



