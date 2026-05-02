
const Vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const JWT_SECRET = process.env.WhatISYourName;

const verifyToken = async (req, res, next) => {
    const token = req.headers.token;

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided. Token Required" });
    }

    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        const vendor = await Vendor.findById(decoded.vendorId);

        if (!vendor) {
            return res.status(401).json({ message: "Invalid token. Vendor not found." });
        }

        req.vendorId = vendor._id;

        next(); 

    }catch(error){  
        console.error("Error verifying token:", error);
        return res.status(401).json({ message: "Invalid token" });

}}

module.exports = verifyToken;