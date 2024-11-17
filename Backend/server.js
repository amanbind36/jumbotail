const express=require("express");

const connection = require("./DB/Connection");

const app=express()

const userRouter = require("./Route/user.Route")
const productRouter =require("./Route/product.Route")

app.use(express.json());

app.use("/",userRouter)
app.use("/product",productRouter)

app.listen(6000,async()=>{
    console.log("server Started")
    await connection
})