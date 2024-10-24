const mongoose = require('mongoose');
const { type } = require('os');
const validator = require('validator');

const userSchema=new mongoose.Schema({
    namse: {
        type:String,
        required:[true,"please enter your name"]
    },
    email:{
        type:String,
        required:[true,'please your you eamil'],
        unique:[true,'already user is present with thie email please use another email'],
        validate:[validator.isEmail,'invalid email '],
    },
    passward:{
        type:String,
        required:[true,'please enter the pasward '],
        minlength:8
    },
    confirmpassward: {
        type:String,
        required:[true,'please confirm passward '],
        validate:{
            validator:function (val) {
               return val==this.passward
            },
            message:'passward and  comnfirm passward are not same '
        }
    }
})

const user =mongoose.model('user',userSchema);
module.exports=user;