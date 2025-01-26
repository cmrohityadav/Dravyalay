import { Product } from "../models/product.model.js";

const getProductsByCategoryId=async(req,res)=>{
    try {
        const {categoryId}=req.params;

        const products=await Product.find({category:categoryId})

        if(!products || products.length===0){
            return res.status(404).json({
                success:false,
                message:'No products found for this category'
            })
        }

        return res.status(200).json({
            success:true,
            data:products,
        })
    } catch (error) {
        console.log("Error in getProductsByCategoryId :: product.controller.js : ",error)
        return res.status(500).json({
            success:false,
            message:"Failed to retrieve  Products",
            error:error.message,
        })
    }
}

export {getProductsByCategoryId}