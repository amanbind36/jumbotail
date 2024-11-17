
const {Schema,model}=require("mongoose")

const warehouseSchema=new Schema({
     warehouseName:{type:String,require:true},
     attribute:{lat:{ type: Schema.Types.Decimal128, required: true } ,long:{ type: Schema.Types.Decimal128, required: true } }
})

const warehouseModel=model("warehouse",warehouseSchema);
module.exports=warehouseModel;