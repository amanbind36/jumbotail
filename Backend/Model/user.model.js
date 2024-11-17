const {Schema, model}=require("mongoose");

const userSchema= new Schema({
    name:{type:String,require:true},
    email:{type:String,require:true,unique:true},
    number:{type:String,require:true},
    role:{type:String,enum:["admin","customer","seller"],default:"customer"},
    location:{type:{type:String,default:"Point"},coordinates:{type:[Number],require:true}}
})

const userModel=model("user",userSchema);

module.exports=userModel;