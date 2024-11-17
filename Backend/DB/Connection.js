const mongoose=require("mongoose")

const connection=mongoose.connect("mongodb://localhost:27017/jumbotail")
.then(()=>console.log("Mongodb connected"))
.catch((err)=>console.log(err));


module.exports=connection;