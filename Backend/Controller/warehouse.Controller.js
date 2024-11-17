const warehouseModel =require("../Model/warehouse.model")



const addWarehouse = async (req, res) => {
    try {
        const { warehouseName, Attribute } = req.body;
        
        const newWarehouse = new warehouseModel({
            warehouseName,
            attribute
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



module.exports={getWarehouses,updateWarehouse,deleteWarehouse,addWarehouse}