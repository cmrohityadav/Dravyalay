import mongoose from "mongoose";
import { DB_NAME, DB_TYPE, } from "../config/dbname.js";

const connectToDB=async()=>{
    try {
        const connectionObject=await mongoose.connect(`${DB_TYPE}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB Host: ${connectionObject.connection.host}`)
    } catch (error) {
        console.log("Error in connectToDB() : ", error)
        process.exit(1);
    }
}
export {connectToDB}