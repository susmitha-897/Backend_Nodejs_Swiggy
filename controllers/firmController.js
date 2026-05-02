

const Firm = require('../models/Firm');
const Vendor = require('../models/Vendor');
const multer = require('multer');


//image upload configuration
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "uploads/"); // folder to save images
      },
      filename: function (req, file, cb) {
        const uniqueName = Date.now() + path.extname(file.originalname); //Generating unique name for the image
        cb(null, uniqueName);
      },
    });

    const upload = multer({ storage: storage });


const createFirm = async (req, res) => {
    const { firmName, area, category, region, offer} = req.body;

    const image = req.file ? req.file.filename : undefined; // Get the image path if uploaded, otherwise set to null


    const vendr = await Vendor.findById(req.vendorId);

    const firm = new Firm({
        firmName,
        area,
        category,
        region,
        offer,
        image,
        vendor: vendr._id
    });

    try {
       const savedFirm = await firm.save();

         vendr.firm.push(savedFirm._id);
        await vendr.save();
        
        res.status(201).json({ message: "Firm created successfully", firm });
    } catch (error) {
        console.error("Error creating firm:", error);
        res.status(500).json({ message: "Error creating firm" });
    }
}; 

const deleteFirmById = async (req, res) => {
    try {
        const firmId = req.params.firmId;
        const deletedFirm = await Firm.findByIdAndDelete(firmId);

        if (!deletedFirm) {
            return res.status(404).json({ message: "Firm not found" });
        }
        res.status(200).json({ message: "Firm deleted successfully" });
    } catch (error) {
        console.error("Error deleting firm:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { createFirm:[upload.single('image'),createFirm], deleteFirmById: deleteFirmById }