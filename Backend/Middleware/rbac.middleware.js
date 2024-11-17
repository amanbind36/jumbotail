const userModel=require("../Model/user.model")

const roleAuthorization=(req,res,next)=>{
    const role=req.userModel.role;
    if (role=="admin"){
        return next()
    }
    return res.status(404).json({message:"you are not authorized"})

}

module.exports={roleAuthorization}