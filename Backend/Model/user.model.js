const {Schema, model}=require("mongoose");

const userSchema= new Schema({
    name:{type:String,require:true},
    email:{type:String,require:true,unique:true},
    password:{type:String,require:true},
    number:{type:String,require:true},
    role:{type:String,enum:["admin","customer","seller"],default:"customer"},
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

const userModel=model("user",userSchema);

module.exports=userModel;