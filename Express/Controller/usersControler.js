const user=require('./../Models/userModel');

exports.singnup=async (req,res)=>{
   try {
    let newuser=await user.create(req.body);
    res.status(200).json({
        message: 'User created successfully',  // It's good to send a more descriptive message
        data: newuser
    });
   } catch (error) {
    res.status(400).json({  // Add status code for error responses
        message: error.message
    });
   }
}