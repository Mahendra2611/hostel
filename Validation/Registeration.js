export const RegisterationValidator = {
    name:{
        notEmpty:{
            errorMessage:"Name cant be empty",
        },
        isString:true,
    },
    email:{
        notEmpty:{
            errorMessage:"Email cant be empty",
        },
        isEmail:true,
        matches:{
            options: /^[0-9]{9,}@hbtu.ac.in$/,
            errorMessage:"Email didn't matched the format"
        }
       
    },
    password:{
        notEmpty:{
            errorMessage:"Password cant be empty",
        },
        isLength:{
            options:{
                min:8,
                max:15
            },
            errorMessage:"Password should be bewteen 8 and 15 characters"
        }
    }
}
