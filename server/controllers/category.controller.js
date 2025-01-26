import { Category } from "../models/category.model.js"


const getAllCategory=async(req,res)=>{

    try {
        const category=await Category.find();
        return res.status(200).json({
            success:true,
            data:category,

        })
        
    } catch (error) {
        console.log("Error in getAllCategory :: category.controller.js : ",error)
        return res.status(500).json({
            success:false,
            message:"Failed to retrieve category",
            error:error.message,
        })
    }

}


export {getAllCategory}