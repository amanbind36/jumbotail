const {Schema,model}=require("mongoose")


const productSchema=new Schema({
    sellerName:{type:String,require:true},
    productName:{type:String,require:true},
    price:{type:Number,require:true},
    location: { 
        lat: { 
          type: Number, 
          required: true  
        },
        lng: { 
          type: Number, 
          required: true 
        }
      },
    attribute:{weight:{type:String},dimensions:{type:String}}
})

const productModel=model("product",productSchema);

module.exports=productModel;