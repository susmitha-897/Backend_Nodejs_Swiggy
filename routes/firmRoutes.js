
const express = require('express');
const firmController = require('../controllers/firmController');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.post('/add-firm', verifyToken,  firmController.createFirm);

router.get('/uploads/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    res.setHeader('Content-Type', 'image/jpeg'); // Set the appropriate content type for the image
    res.sendFile(path.join(__dirname, '..', 'uploads', imageName)); // Send the image file from the uploads directory
});

router.delete('/:firmId', firmController.deleteFirmById);
    
module.exports = router;