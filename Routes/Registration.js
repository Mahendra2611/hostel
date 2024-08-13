import { Router } from "express";
import { checkSchema,validationResult } from "express-validator";
import {RegisterationValidator} from "../Validation/Registeration.js";
import { Registeration } from "../models/Registeration.js";
import { HashPassword } from "../Hashing/HashPassword.js";
import jwt  from "jsonwebtoken";
import bcrypt from "bcrypt"
const RegistrationRouter = Router();
RegistrationRouter.post("/api/register",checkSchema(RegisterationValidator),async(req,res)=>{
    const {body} = req;
   const result = validationResult(req);
   if(!result.isEmpty()){
    (result.errors.map((err)=>console.log(err.msg)));
    return res.status(400).send({msg:"Validation failed"})
   }
   else{
    console.log(body);
    try {
        const hashPassword = HashPassword(body.password);
        body.password = hashPassword;
       const data = await Registeration.create({...body});
       return res.status(200).send({msg:"User registered succesfully",
        data:data,
    })
    } catch (error) {
        if(error.code === 11000){
            console.log("User  already exist")
            return res.status(400).send({msg:"User already exist"})
         }
       else {
        return res.status(404).send({msg:"registeration deatil storage failed"})
       }
    }
    
   }
})
RegistrationRouter.post("/api/login",async(req,res)=>{
    const {email,password} = req.body;
    try {
        const UserData = await Registeration.findOne({email:email})
        console.log(UserData)
        if(!UserData.isEmpty){
            const result = await bcrypt.compare(password,UserData.password);
            console.log(result)
            if(result){
                const token = jwt.sign({
                    user:{
                       name:UserData.name,
                       email:UserData.email
                    }
                },
                "djhsf76r4",
            {expiresIn:"1h"})
            return res.status(200).send({msg:token})
            }
        }
        else{
            return res.status(404).send({msg:"User didn't exist"})
        }
        
        return res.status(200).send({msg:"User logged in succesfully"})
    } catch (error) {
        console.log(error)
        return res.status(404).send({msg:"some went wrong"})
    }
    //console.log(body);
    
    
})
export default RegistrationRouter