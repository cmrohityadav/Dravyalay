import dotenv from 'dotenv'
dotenv.config();
const DB_NAME=process.env.DB_NAME;
const DB_TYPE_LOCAL=process.env.MONGODB_LOCAL_URI;


//final
//DB TYPE
const DB_TYPE=DB_TYPE_LOCAL;

export {DB_NAME,DB_TYPE}