const {Router}=require("express")
const {register,login}=require("../Controller/userController")
const userRouter=Router();

userRouter.get("/getuser",login);
userRouter.post("/",register)


module.exports=userRouter;
