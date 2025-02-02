import Razorpay from "razorpay"
import crypto from 'crypto'
import {Order} from '../models/order.model.js'
import {Transaction}  from "../models/transaction.model.js"


const createTransaction=async(req,res)=>{
    try {
        const {amount,userId}=req.body
        const razorpay=new Razorpay({
            key_id:process.env.RAZOR_PAY_KEY_ID ,
            key_secret:process.env.RAZOR_PAY_SECRET
        })

        const option={
            amount:amount,
            currency:'INR',
            receipt:`receipt #${Date.now()}`
        }

        if(!amount || !userId){
            return res.status(400).json({
                sucess:false,
                message:"Amount and userid required"
            })
        }

        const razorpayOrder=await razorpay.orders.create(option)

        return res.status(201).json({
            success:true,
            message:"Order created successfully",
            amount:razorpayOrder.amount,
            currency:razorpayOrder.currency,
            orderId:razorpayOrder.id,
            key:process.env.RAZOR_PAY_KEY_ID
        })
    } catch (error) {
        
        return res.status(400).json({
            success:false,
            message:"Failed to create order",
            error:error.message,
        })
    }
}

const createOrder=async(req,res)=>{
try {
   const {
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature,
    userId,
    cartItems,
    deliveryDate,
    address
   }=req.body;

   const keySecret=process.env.RAZOR_PAY_SECRET;

   const generatedSignature=crypto.createHmac('sha256',keySecret)
   .update(razorpayOrderId+"|"+razorpayPaymentId)
   .digest('hex')


   if(generatedSignature===razorpaySignature){
     try {
        const transaction=await Transaction.create({
            user:userId,
            orderId:razorpayOrderId,
            paymentId:razorpayPaymentId,
            status:"Success",
            amount:cartItems.reduce((total,item)=>total+item?.quantity*item.price,0)
        })
       

        const order=await Order.create({
            user:userId,
            address,
            deliveryDate,
            items:cartItems?.map(()=>({
                product:item?._id,
                quantity:item?.quantity,
            })),
            status:"Order Placed",
        });

        transaction.order=order._id;
        await transaction.save()

        return res.json({
            success:true,
            message:"Payment Verified and ordder created",
            order
        })

        
     } catch (error) {
        console.log("Error in generatedSignature :: : ",error)
        return res.status(500).json({
            success:false,
            message:"Failed to retrieve category",
            error:error.message,
        })
     }
   }

} catch (error) {
    console.log("Error in createOrder :: category.controller.js : ",error)
        return res.status(500).json({
            success:false,
            message:"Failed to retrieve category",
            error:error.message,
        })
}
    
}


const getOrdersByUserId=async (req,res)=>{
    const {userId}=req.params;
    try {
        const orders=await Order.find({user:userId})
        .populate("user","name email")
        .populate("items.product","name price image_uri  ar_uri")
        .sort({createdAt :-1})

        if(!orders || orders.length==0){
            return res.status(404).json({
                success:false,
                message:"No orders found for this user"
            })
        }
    } catch (error) {
        console.log("Error in getOrdersByUserId :: category.controller.js : ",error)
        return res.status(500).json({
            success:false,
            message:"Failed to retrieve category",
            error:error.message,
        })
        
    }
}


export {createOrder,createTransaction,getOrdersByUserId}