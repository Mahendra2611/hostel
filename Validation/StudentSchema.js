export const StudentSchema = {
    name:{
        notEmpty:true,
        errorMessage:"Name can't be empty",
        isString:true,
        errorMessage:"Name should be a string",
        
    },
    rollNo:{
        notEmpty:true,
        errorMessage:"Roll number can't be empty",
        isInt:true,
        errorMessage:"Roll number should be of integer type",
    },
    branch:{
        notEmpty:true,
        errorMessage:"branch can't be empty",
        isString:true,
        errorMessage:"Branch should be a string",
    }
}