

const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.post('/add-product/:firmId', productController.addProduct);

router.get('/:firmId/products', productController.getProductsByFirm);

router.get("/uploads/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  res.setHeader("Content-Type", "image/jpeg"); // Set the appropriate content type for the image
  res.sendFile(path.join(__dirname, "..", "uploads", imageName)); // Send the image file from the uploads directory
});

router.delete('/:productId', productController.deleteProductById);
module.exports = router;