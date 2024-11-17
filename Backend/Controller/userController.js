const userModel=require("../Model/user.model")


const register=async(req,res)=>{
    try{
       const {name,email,password,number,role,location}=req.body;
       const user=await userModel.insertMany({name,email,password,number,role,location}) ;
       return res.ststus(201).json({message:"user register successfully"})

    }catch(err){
        res.status(500).json({ message: err.message });
    }
}

const login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if (email,password){
            const user=await userModel.findOne({email:email});
            if(user){
                if(password===user.password){
                    return res.status(200).json({message:"logged in successfully"})
                }
                else{
                    res.status(404).json({ message: "give correct credentials" });
                }
            }
            else{
                res.status(400)
      .json({ message: "Please fill all the required fields" });
            }
        }

    }catch(err){
        res.status(500).json({ message: err.message });
    }
}

module.exports={register,login}