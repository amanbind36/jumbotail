const userModel=require("../Model/user.model")


const register=async(req,res)=>{
    try{
       const {name,email,password,number,role,location}=req.body;
       const user=await userModel.insertMany({name,email,password,number,role,location}) ;
       return res.ststus(201).json({message:"user register successuly"})

    }catch(err){

    }
}