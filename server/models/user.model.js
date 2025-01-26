import mongoose,{ Schema, } from "mongoose";
import jwt from 'jsonwebtoken'

const userSchema=new Schema({
    mobileNumber:{
        type:String,
        required:true,
        unique:true
    },
    address:{String
    },
    
},{timestamps:true})

userSchema.methods.generateAccessToken=function(){
    return jwt.sign({
        userId:this._id,

    },
    process.env.ACCESS_TOKEN_KEY,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXP
    }

    )
}

userSchema.methods.generateRefreshToken=function(){
    return jwt.sign({
        userId:this._id
    },
    process.env.REFRESH_TOKEN_KEY
    ,{
        expiresIn: process.env.REFRESH_TOKEN_EXP
})
}

export const User=mongoose.model("User",userSchema)