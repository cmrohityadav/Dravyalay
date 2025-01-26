import express from "express"


const app=express();


app.use(express.json());


//////// IMPORT ROUTER /////////////

import userRouter from "./routes/user.Router.js"
import categoryRouter from './routes/category.router.js'
import productRouter from './routes/product.router.js'

app.use('/api/v1/user',userRouter)
app.use('/api/v1/category',categoryRouter)
app.use('/api/v1/product',productRouter)

//initial routes for testing
app.use('/ping',(req,res)=>{res.send("pong")})
app.use('/user',userRouter)


//// !!!!!IMPORTANT use it always last /////////////////
app.all("*",(req,res)=>{
    res.status(404).send("OOPS !! 404 page not found")
})



export {app}