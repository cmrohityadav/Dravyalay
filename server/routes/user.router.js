import express from "express"
const  router=express.Router();

////// IMPORT CONTROLLERS /////
import { login } from "../controllers/user.Controller.js";




router.route('/login').post(login)







//testing purpose only
router.get("/testing",(req,res)=>{
    res.status(200).send("hello")
})


export default router