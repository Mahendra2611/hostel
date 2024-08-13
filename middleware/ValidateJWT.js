import jwt from "jsonwebtoken"
export const ValidateJWT = (req,res,next)=>{
    const token = req.headers.authorization
    console.log(req.headers.authorization)
    jwt.verify(token,process.env.JWT_ACCESS_TOKEN ,(err,decoded)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log(decoded)
        }
        next();
    })

}