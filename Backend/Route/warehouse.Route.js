const {Router}=require("express")

const {getWarehouses,updateWarehouse,deleteWarehouse,addWarehouse}=require("../Controller/warehouse.Controller")

const warehouseRouter=Router();

warehouseRouter.get("/getwarehouse",getWarehouses);
warehouseRouter.post("/addwarehouse",addWarehouse);
warehouseRouter.patch("/updatewarehouse/:id",updateWarehouse);
warehouseRouter.delete("deletewarehouse/:id",deleteWarehouse);


module.exports=warehouseRouter;