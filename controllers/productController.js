
const productModel = require('../models/Product');

const multer = require('multer');

const firmModel = require('../models/Firm');

const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage }); 

const addProduct = async (req, res) => {
    try {
    const { productName, price, category, description, bestsellor } = req.body;
    const image = req.file ? req.file.filename : undefined; // Get the image path if uploaded, otherwise set to null

    const firmid = req.params.firmId; // Assuming the firm ID is passed as a URL parameter

    const firm = await firmModel.findById(firmid);

    if (!firm) {
        return res.status(404).json({ message: "Firm not found" });
    }

    const product = new productModel({
        productName,
        price,
        category,
        description,
        bestsellor,
        image,
        firm: firm._id
    });
    const savedProduct = await product.save();

        firm.product.push(savedProduct._id);

    await firm.save();

    res.status(201).json({ message: "Product added successfully", product: savedProduct });

}catch(error){
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Internal server error" });


}
};

const getProductsByFirm = async (req, res) => {
    try{
        const firmid = req.params.firmId; // Assuming the firm ID is passed as a URL parameter
        const firm = await firmModel.findById(firmid).populate('product'); // Populate the product field to get product details

        if (!firm) {
            return res.status(404).json({ message: "Firm not found" });
        }

        const restaurentName = firm.firmName; // Get the restaurant name associated with the firm

        const products = firm.product; // Get the products associated with the firm
        res.status(200).json({ restaurentName, products });
    }catch(error){
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const deleteProductById = async (req, res) => {
    try {
        const productId = req.params.productId;
        const deletedProduct = await productModel.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { addProduct: [upload.single('image'), addProduct], getProductsByFirm: getProductsByFirm, deleteProductById: deleteProductById }; 