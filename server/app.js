import express from "express"


const app=express();


app.use(express.json());





//initial routes for testing
app.use('/ping',(req,res)=>{res.send("pong")})

app.all("*",(req,res)=>{
    res.status(404).send("OOPS !! 404 page not found")
})

export {app}