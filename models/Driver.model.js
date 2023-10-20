const mongoose=require('mongoose');
const driverSchema=new mongoose.Schema({    
    driverName:{
        type:String,
        required:true,
        trim:true,
        minlength:3
    },
    driverPhoneNumber:{
        type:String,
        required:true,
        trim:true,
        minlength:3
    },
    driverAddress:{
        type:String,
        required:true,
        trim:true,
        minlength:3
    },
    licenseNumber:{
        type:String,
        required:true,
        trim:true,
        minlength:3
    },
    licenseExpiryDate:{
        type:String,
        required:true,
        trim:true,
        minlength:3
    },
    busAssigned:{
        type:String,
        required:true,
        trim:true,
        enum:['1','2','3','4']
    },
    



});
module.exports=mongoose.model('Driver',driverSchema);

