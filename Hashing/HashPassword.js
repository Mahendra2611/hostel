import bcrypt from "bcrypt";
const Saltround = 10;
export const HashPassword = (password)=>{
    const salt = bcrypt.genSaltSync(Saltround);
   const hash =  bcrypt.hashSync(password,salt);
   return hash;
}