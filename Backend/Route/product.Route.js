const {Router}=require("express")
const {addProduct,getAllProducts,updateProduct,deleteProduct}=require("../Controller/productController")
const {roleAuthorization}=require("../Middleware/rbac.middleware");
const {authenticate}= require("../Middleware/auth.middleware")
const productRouter=Router()

productRouter.get("/getproduct",getAllProducts);
productRouter.post("/addproduct",addProduct);
productRouter.delete("/deleteproduct/:id",authenticate,roleAuthorization,deleteProduct);
productRouter.patch("/updateproduct/:id",authenticate,roleAuthorization,updateProduct);

module.exports=productRouter;