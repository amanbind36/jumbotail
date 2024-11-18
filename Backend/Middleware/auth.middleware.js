
const {UserModel} =require("../Model/user.model")
const {productModel} =require("../Model/product.model")
const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  try {
   
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Please login" });
    }

    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    
    const user = 
      await UserModel.findById(decoded.id) ||
      await productModel.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found, please login again" });
    }

    
    req.UserModel = decoded;
    return next();

  } catch (err) {
    
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  authenticate,
};
