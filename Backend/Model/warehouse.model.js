
const {Schema,model}=require("mongoose")

const warehouseSchema=new Schema({
     warehouseName:{type:String,require:true},
     location:{lat:{ type: Schema.Types.Decimal128, required: true } ,lng:{ type: Schema.Types.Decimal128, required: true } }
})

const warehouseModel=model("warehouse",warehouseSchema);
module.exports=warehouseModel;