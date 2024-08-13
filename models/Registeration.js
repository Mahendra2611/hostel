import mongoose from "mongoose";
 const RegistrationSchema = mongoose.Schema({
    name:{
        required:true,
        type:String,
        
    },
    email:{
        required:true,
        type:String,
        unique:true,
       
        errorMessage:"This email already exist"

    },
    password:{
       type:String,
       required:true,
        errorMessage:"Password should be atleast 8 characters and  maximum 15 characters"
    }
 })

 export const Registeration = mongoose.model('Registeration',RegistrationSchema);