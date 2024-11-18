const {Router}=require("express")

const {getWarehouses,updateWarehouse,deleteWarehouse,addWarehouse,nearest,shipping,calculate}=require("../Controller/warehouse.Controller")
const {roleAuthorization}=require("../Middleware/rbac.middleware");
const {authenticate}= require("../Middleware/auth.middleware")
const warehouseRouter=Router();

warehouseRouter.get("/getwarehouse",authenticate,roleAuthorization,getWarehouses);
warehouseRouter.post("/addwarehouse",authenticate,roleAuthorization,addWarehouse);
warehouseRouter.patch("/updatewarehouse/:id",authenticate,roleAuthorization,updateWarehouse);
warehouseRouter.delete("deletewarehouse/:id",authenticate,roleAuthorization,deleteWarehouse);
warehouseRouter.get("/nearest",nearest);
warehouseRouter.get("/shipping-charge",shipping);
warehouseRouter.post("//shipping-charge/calculate",calculate)

module.exports=warehouseRouter;