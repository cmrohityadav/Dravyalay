import mongoose,{Schema} from "mongoose";

const productSchema=new Schema({
    name:{
        type:String,
        required:true,

    },
    price:{
        type:Number,
        required:true
    },
    arUrl:{type:String},
    imageUrl:{
        type:String,
        required:true

    },
    description:{
        type:String
    }
    ,
    category:[{type:mongoose.Schema.Types.ObjectId,ref:'Category'}]
},{timestamps:true})


export const Product=mongoose.model("Product",productSchema)