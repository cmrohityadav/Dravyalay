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
    1.20.40
} catch (error) {
    
}
    
}

export {createOrder,createTransaction}