import { Router } from "express";
import { checkSchema ,validationResult} from "express-validator";
import { StudentSchema } from "../Validation/StudentSchema.js";
import { User } from "../models/StorageSchema.js";
import { ValidateJWT } from "../middleware/ValidateJWT.js";
const router = Router()
router.get("/api/allstd",async(req,res)=>{
    try {
        const data = await  User.find();
        
        res.send({msg:"Details of all student are displayed here",
            info:data
        })
    } catch (error) {
        console.log(error);
        res.status(404).send({msg:"data is not able to fetched"})
    }
    
})
router.get("/api/std/:id",ValidateJWT,async(req,res)=>{
    const {id} = req.params;
    console.log(id)
    try {
        const data = await User.find({"rollNo":id,})
        if(data.length === 0){
           return res.send({msg:"User didn't exist"})
        }
        return res.send({msg:"User specific details get",
            user_data : data
        })
    } catch (error) {
        res.send(404).send({msg:"Something went wrong",
            err:error
        })
    }
    
})
router.post("/api/std/:id",checkSchema(StudentSchema),async(req,res)=>{
    const result = validationResult(req);
    const {body} = req;
    const newUser = new User(body)
    try {
         await newUser.save();
    } catch (error) {
        if(error.code === 11000){
           console.log("Roll no already exist")
           return res.status(400).send({msg:"Roll number already in use"})
        }
        else{
          console.log(error)
          return res.status(400).send({msg:"Something went wrong"})
        }
    }
    //console.log(`new user : ${newUser}`)
    //console.log(body)
    if(!result.isEmpty()){
        result.errors.map((err)=>console.log(err.msg))
    }
   else{
    res.send({msg:"User specific details post"})
   }
})
router.put("/api/std/:id",async(req,res)=>{
    const {body,params:{id}} = req;
    try {
        const result = await User.updateOne({"rollNo":id},body);
        return res.send({msg:"User specific details put",
            result:result
        })
    } catch (error) {
        return res.send(404).send({msg:"something went wrong in update"})
    }
   
})
router.delete("/api/std/:id",async(req,res)=>{
    const {id} = req.params;
    try {
        const data = await User.deleteOne({"rollNo":id});
        return res.send({msg:`User delete`,
            details:data
        })
    } catch (error) {
        return res.status(404).send({msg:"User is not deleted"})
        
    }
    res.send({msg:"User specific details delete"})
})
export default router