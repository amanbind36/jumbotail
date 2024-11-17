const userModel = require("../Model/user.model");
const argon2 = require("argon2");
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
require("dotenv").config();

const register = async (req, res) => {
    try {
        const { name, email, password, number, role, location } = req.body;

        // Hash the password using argon2
        const hashedPassword = await argon2.hash(password);

        // Insert user into the database
        const user = await userModel.insertMany({ 
            name, 
            email, 
            password: hashedPassword, 
            number, 
            role, 
            location 
        });

        return res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email && password) {
            // Find user by email
            const user = await userModel.findOne({ email: email });

            if (user) {
                // Verify the password using argon2
                const isPasswordValid = await argon2.verify(user.password, password);

                if (!isPasswordValid) {
                    res.status(401).json({ message: "Invalid credentials" });
                    
                } 
                const token=jwt.sign(
                    {email,id:user._id,role:user.role},
                    process.env.JWTSECRTEKEY,{expiresIn:"2 days"}
                )
                return res.status(200).json({ token,message: "Logged in successfully" });
            } 
        } 
           return res.status(400).json({ message: "Please fill all the required fields" });
        
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const update=async(req,res)=>{
    try{
        const {_id}=req.params;
        const update=req.body;
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }
        const user=await userModel.findByIdAndUpdate(_id,update)
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(201).json({message:"user updated"})
    }catch(err){
        res.status(500).json({ message: err.message });
    }
}

const deleteuser=async(req,res)=>{
    try{
        const {id}=req.params;
        await userModel.findByIdAndDelete(id)
        res.json(201).json({message:"user deleted"})
    }catch(err){
        res.status(500).json({ message: err.message });
    }
}

module.exports = { register, login ,update,deleteuser};
