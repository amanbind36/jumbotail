const {Router}=require("express")
const {addProduct,getAllProducts,updateProduct,deleteProduct}=require("../Controller/productController")
const productRouter=Router()

productRouter.get("/getproduct",getAllProducts);
productRouter.post("/addproduct",addProduct);
productRouter.delete("/deleteproduct/:id",deleteProduct);
productRouter.patch("/updateproduct/:id",updateProduct);

module.exports=productRouter;