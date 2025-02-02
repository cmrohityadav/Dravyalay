import dotenv from 'dotenv'
import mongoose,{Types} from 'mongoose'
import { Product } from './models/product.model.js'
import { Category } from './models/category.model.js'
import { categoriesData,productData } from './seedData.js'
import { connectToDB } from './database/connectDB.js'
dotenv.config()
async function seedDatabase(){
    try {

       await connectToDB();

       await Product.deleteMany({});
       await Category.deleteMany({});

       const categoryDocs=await Category.insertMany(categoriesData)

       const categoryMap=categoryDocs.reduce((map,category)=>{
        map[category.name]=category._id;
        return map
       })

       const productWithCategoryIds=productData.map((product)=>({
        ...product,
        category:categoryMap[product.category],
       }))

       await Product.insertMany(productWithCategoryIds)
        console.log("DB  SEEDING Successfully");
        
    } catch (error) {
        console.error("Error Seeding DB : ",error)

    }finally{
        mongoose.connection.close()
    }
}

seedDatabase()