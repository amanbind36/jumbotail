const userModel=require("../Model/user.model")
const userModel=require("../Model/user.model")

const roleAuthorization=(req,res,next)=>{
    const role=req.userModel.role;
    if (role=="admin"||role=="seller"){
        return next()
    }
    return res.status(404).json({message:"you are not authorized"})

}

module.exports={roleAuthorization}