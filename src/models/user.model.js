import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrpyt from "bcrypt";

const userSchema = new Schema(
    {
        username : {
            type : String,
            required : true,
            unique : true,
            lowercase : true,
            trim : true,
            index : true, // sets index for field
        },
        email : {
            type : String,
            required : true,
            unique : true,
            lowercase : true,
            trim : true,
            
        },

        fullname : {
            type : String,
            required : true,
            trim : true,
            index : true,
        },

        avatar : {
            type : String, // cloudinary url
            required : true,
        },

        coverimage : {
            type : String, // cloudinary url
            
        },
        
        watchhistory:{
            type : Schema.Types.ObjectId,
            ref : "Video"      
        },

        password : {
            type : String,
            required : [true,"Password is required"]
        },

        refreshtoken:{
            type : String
        }



    },
    {
        timestamps : true
    }
)

//Hooks for before - saving

// async as algo takes time
userSchema.pre("save", async function(next) {
    //modify password hash only when password is modified
    if(!this.isModified("password")) return next();

    this.password = bcrpyt.hash(this.password, 10)
    next()
})

//verify passwords
userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrpyt.compare(password, this.password)
}

userSchema.methods.generateAcessToken=function(){
    return jwt.sign({
        _id: this._id,
        username:this.username
    },
    
    process.env.ACCESS_TOKEN_SECRET,

    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
    
    )
}

userSchema.methods.generateRefreshToken=function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User",userSchema)