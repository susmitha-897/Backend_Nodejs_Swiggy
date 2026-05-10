

// console.log("Welcome to the backend of the full stack project!");
// console.log("This is where we will set up our server and connect to the database.");

const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const vendorRoutes = require('./routes/vendorRoutes');
const firmRoutes = require('./routes/firmRoutes');
const productRoutes = require('./routes/productRoutes');
const path = require('path');

const app = express();

const PORT =  process.env.PORT || 4000;

dotenv.config();

mongoose.connect(process.env.MONGO_URI)

.then(() => {
    console.log("Connected to MongoDB successfully!");
})
.catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});

app.use(bodyParser.json());

app.use('/vendor', vendorRoutes);

app.use('/firm', firmRoutes);

app.use('/product', productRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve static files from the uploads directory


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use('/', (req, res) => {
    res.send("Welcome to the home page of the backend!");
});