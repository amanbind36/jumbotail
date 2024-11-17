const express=require("express");
const connection = require("./DB/Connection");
const app=express()
app.use(express.json());

app.listen(6000,async()=>{
    console.log("server Started")
    await connection
})