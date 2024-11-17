const {Router}=require("express")
const {register,login,update,deleteuser}=require("../Controller/userController")
const userRouter=Router();

userRouter.get("/getuser",login);
userRouter.post("/register",register);
userRouter.patch("/update/:id",update);
userRouter.delete("/delete/:id",deleteuser)


module.exports=userRouter;
