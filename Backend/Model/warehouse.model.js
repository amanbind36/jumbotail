
const {Schema,model}=require("mongoose")

const warehouseSchema=new Schema({
     warehouseName:{type:String,require:true},
     location: { 
          lat: { 
            type: Number, 
            required: true  
          },
          lng: { 
            type: Number, 
            required: true 
          }
        }
})

const warehouseModel=model("warehouse",warehouseSchema);
module.exports=warehouseModel;