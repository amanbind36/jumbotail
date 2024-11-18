const {Schema,model}=require("mongoose")


const productSchema=new Schema({
    sellerName:{type:String,require:true},
    productName:{type:String,require:true},
    price:{type:Number,require:true},
    location:{weight:{type:String},dimensions:{type:String}}
})

const productModel=model("product",productSchema);

module.exports=productModel;