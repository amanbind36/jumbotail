const warehouseModel =require("../Model/warehouse.model")
const userModel = require("../Model/user.model");
const productModel = require("../Model/product.model");

const addWarehouse = async (req, res) => {
    try {
        const { warehouseName, location } = req.body;
        
        const newWarehouse = new warehouseModel({
            warehouseName,
            location
        });

        await newWarehouse.save();
        res.status(201).json({ message: "Warehouse added successfully", warehouse: newWarehouse });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



const getWarehouses = async (req, res) => {
    try {
        const warehouses = await warehouseModel.find();
        res.status(200).json(warehouses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const updateWarehouse = async (req, res) => {
    try {
        const {id } = req.params;
        const updateData = req.body;

        const updatedWarehouse = await warehouseModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true } 
        );

        if (!updatedWarehouse) {
            return res.status(404).json({ message: "Warehouse not found" });
        }

        res.status(200).json({ message: "Warehouse updated successfully", warehouse: updatedWarehouse });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const deleteWarehouse = async (req, res) => {
    try {
        const { id } = req.params;
        
        const deletedWarehouse = await warehouseModel.findByIdAndDelete(id);
        
        if (!deletedWarehouse) {
            return res.status(404).json({ message: "Warehouse not found" });
        }

        res.status(200).json({ message: "Warehouse deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const toRad = (x) => x * Math.PI / 180;
    const R = 6371; 
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; 
};


const nearest= async (req, res) => {
 
    const { sellerId, productId } = req.query;

    try {
        const seller = await productModel.findById(sellerId);
        if (!seller) return res.status(404).send("Seller not found.");

  
        const sellerLocation = seller.location;

        const warehouses = await warehouseModel.find();
        let nearestWarehouse = null;
        let minDistance = Infinity;

        warehouses.forEach((warehouse) => {
            const distance = calculateDistance(sellerLocation.lat, sellerLocation.lng, warehouse.location.lat, warehouse.location.lng);
            if (distance < minDistance) {
                minDistance = distance;
                nearestWarehouse = warehouse;
            }
        });

        if (nearestWarehouse) {
            res.json({
                warehouseId: nearestWarehouse._id,
                warehouseLocation: nearestWarehouse.location
            });
        } else {
            res.status(404).send("No warehouses found.");
        }
    } catch (error) {
        res.status(500).send("Internal server error");
    }
};


const shipping=async (req, res) => {
    const { warehouseId, customerId ,deliverySpeed} = req.query;

    try {
        const warehouse = await warehouseModel.findById(warehouseId);
        const customer = await userModel.findById(customerId);

        if (!warehouse || !customer) return res.status(404).send("Warehouse or Customer not found.");

       
        const distance = calculateDistance(warehouse.location.lat, warehouse.location.lng, customer.location.lat, customer.location.lng);

       
        let ratePerKg = 0;
        if (distance >= 500) {
            ratePerKg = 1;
        } else if (distance >= 100) {
            ratePerKg = 2;
        } else {
            ratePerKg = 3;
        }

        const shippingCharge = ratePerKg * 1 * distance;

        
        let additionalCharge = 0;
        if (deliverySpeed === 'express') {
            additionalCharge = 1.2 * 1; 
        }

        res.json({
            shippingCharge: 10 + shippingCharge + additionalCharge
        });
    } catch (error) {
        res.status(500).send("Internal server error");
    }
};

const calculate= async (req, res) => {
    const { sellerId, customerId, deliverySpeed } = req.body;

    try {
     
        const seller = await productModel.findById(sellerId);
        if (!seller) return res.status(404).send("Seller not found.");
        
        
        const warehouses = await warehouseModel.find();
        let nearestWarehouse = null;
        let minDistance = Infinity;
        warehouses.forEach((warehouse) => {
            const distance = calculateDistance(seller.location.lat, seller.location.lng, warehouse.location.lat, warehouse.location.lng);
            if (distance < minDistance) {
                minDistance = distance;
                nearestWarehouse = warehouse;
            }
        });

       
        const customer = await userModel.findById(customerId);
        if (!customer) return res.status(404).send("Customer not found.");

        
        const distance = calculateDistance(nearestWarehouse.location.lat, nearestWarehouse.location.lng, customer.location.lat, customer.location.lng);
        let ratePerKg = 0;
        if (distance >= 500) {
            ratePerKg = 1;
        } else if (distance >= 100) {
            ratePerKg = 2;
        } else {
            ratePerKg = 3;
        }

       
        const shippingCharge = ratePerKg * 1 * distance;
        let additionalCharge = 0;
        if (deliverySpeed === 'express') {
            additionalCharge = 1.2 * 1; 
        }

        res.json({
            shippingCharge: 10 + shippingCharge + additionalCharge ,
            nearestWarehouse: {
                warehouseId: nearestWarehouse._id,
                warehouseLocation: nearestWarehouse.location
            }
        });
    } catch (error) {
        res.status(500).send("Internal server error");
    }
};


module.exports={getWarehouses,updateWarehouse,deleteWarehouse,addWarehouse,nearest,shipping,calculate}