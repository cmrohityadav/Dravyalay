import mongoose,{Schema} from "mongoose";

const categorySchema=new Schema({
    name:{
        type:String,
        required:true,

    },
    imageUrl:{
        type:String,
        required:true

    }
    ,
    product:[{type:mongoose.Schema.Types.ObjectId,ref:'Product'}]
},{timestamps:true})


export const Category=mongoose.model("Category",categorySchema)