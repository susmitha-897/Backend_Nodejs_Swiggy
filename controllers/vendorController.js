
const Vendor = require('../models/Vendor');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const JWT_SECRET = process.env.WhatISYourName

const vendorRegister = async (req, res) => {
        const { username, email, password } = req.body; 

        try{
            const vendorEmail = await Vendor.findOne({ email: email });

            if(vendorEmail){
                return res.status(400).json( "Vendor with this email already exists" );
            }
            const hashedPassword = await bcrypt.hash(password, 10);//algotithm and salt rounds

            const newVendor = new Vendor({
                username,
                email,
                password: hashedPassword
            });

            await newVendor.save();
            res.status(201).json({ message: "Vendor registered successfully.", vendor: newVendor });
            console.log("Vendor registered successfully:", newVendor);

        }catch(error){
            console.error("Error registering vendor:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    };

//login

const vendorLogin = async (req, res) => {
    const { email, password } = req.body;  

    try{
        const vendor = await Vendor.findOne({ email: email });

        if(!vendor || !await bcrypt.compare(password, vendor.password)){
            return res.status(401).json({ message: "Invalid email or password" });
        }

    const token = jwt.sign({ vendorId: vendor._id },JWT_SECRET,{ expiresIn: '1h' });
        res.status(200).json({ message: "Vendor logged in successfully.", vendor: vendor, token: token });
        console.log("Vendor logged in successfully:", vendor, token);
        console.log(email,"this is token", token);

}catch(error){
    console.error("Error logging in vendor:", error);
    res.status(500).json({ message: "Internal server error" });
}
};

const getAllVendors = async (req, res) => {

    try{
        const vendors = await Vendor.find().populate('firm'); // Populate the firm field to get firm details
        res.status(200).json({ vendors });
    } catch (error) {
        console.error("Error fetching vendors:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


const getvendorbyId = async (req, res) => {
    const vendorId = req.params.id;

    try {
        const vendor = await Vendor.findById(vendorId).populate('firm'); // Populate the firm field to get firm details

        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }

        res.status(200).json({ vendor });
    } catch (error) {
        console.error("Error fetching vendor:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports= { vendorRegister, vendorLogin, getAllVendors, getvendorbyId }