import mongoose,{Schema} from "mongoose";

const itemSchema=new Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true,
    },
    quatity:{
        type:Number,
        required:true
    }
    
},{timestamps:true})


const orderSchema=new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    deliveryDate:{
        type:String,
    },
    items:{
        type:[itemSchema],
        required:true
    },
    status:{
        type:String,
        enum:[
            "Order Placed",
            "Shipping",
            "Delivered",
            "cancelled"
        ],
        default:"Order Placed",
        required:true
    },

},{timestamps:true})
export const Order=mongoose.model("Order",orderSchema)