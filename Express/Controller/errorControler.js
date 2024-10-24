const customerror=require('./../utils/customerrors');


const casterrorhandler=(err)=>{
    const msg=`Invalid value  for ${err.path} : ${err.value}`;
    return new customerror(msg,400);
}

const dupicationhandler=(err)=>{
    const movename=err.keyValue.name;
    const msg=`Already their is move with this ${movename} please use other name `;
    return new customerror(msg,400);
}
const developerr=(res,error)=>{
    res.status(error.statusCode).json({
        status:error.statusCode,
        message:error.message,
        stackTracker:error.stack,
        err:error
    })
}

const productionerror=(res,error)=>{
    if(error.isOperational) {
        res.status(error.statusCode).json({
            status:error.statusCode,
            message:error.message
        })
    }
    else {
        res.status(500).json({
            status:'error',
            message:'something went wrong . please try again '
        })
    }
}



module.exports=(err,req,res,next)=>{
    err.statusCode=err.statusCode|| 500;
    err.status=err.status || 'error';
   if(process.env.NODE_ENV==='development') {
    developerr(res,err)
   }
   else if (process.env.NODE_ENV=='production'){
    
    if(err.name==='CastError') err=casterrorhandler(err);
    if(err.code===11000) err=dupicationhandler(err);



    productionerror(res,err)
   }
}