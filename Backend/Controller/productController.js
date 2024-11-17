
const productModel = require("../Model/product.model");
const addProduct = async (req, res) => {
    try {
        const { sellerName, productName, price, attribute } = req.body;

        const newProduct = new productModel({
            sellerName,
            productName,
            price,
            attribute,
        });

        await newProduct.save();
        res.status(201).json({ message: "Product added successfully", product: newProduct });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const getAllProducts = async (req, res) => {
    try {
        const products = await productModel.find();
        res.status(200).json({ message: "Products retrieved successfully", products });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const product = await productModel.findByIdAndUpdate(id, updates, { new: true });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product updated successfully", product });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await productModel.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully", product });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


module.exports={addProduct,getAllProducts,updateProduct,deleteProduct}


