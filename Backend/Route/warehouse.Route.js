const {Router}=require("express")

const {getWarehouses,updateWarehouse,deleteWarehouse,addWarehouse,nearest,shipping,calculate}=require("../Controller/warehouse.Controller")

const warehouseRouter=Router();

warehouseRouter.get("/getwarehouse",getWarehouses);
warehouseRouter.post("/addwarehouse",addWarehouse);
warehouseRouter.patch("/updatewarehouse/:id",updateWarehouse);
warehouseRouter.delete("deletewarehouse/:id",deleteWarehouse);
warehouseRouter.get("/nearest",nearest);
warehouseRouter.get("/shipping-charge",shipping);
warehouseRouter.post("//shipping-charge/calculate",calculate)

module.exports=warehouseRouter;