import mongoose from "mongoose";
const UserSchema = mongoose.Schema({
    name:{
        required:true,
        type:mongoose.Schema.Types.String,
        
    },
    rollNo:{
        required:true,
        unique:true,
        errorMessage:"Roll No already exist",
        type:mongoose.Schema.Types.Number,
        
    },
    branch:{
        required:true,
        type:mongoose.Schema.Types.String,
    }
})

export const User = mongoose.model('Stdetails',UserSchema)