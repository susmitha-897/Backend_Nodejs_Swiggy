
const mongoose = require('mongoose');

const firmSchema = new mongoose.Schema({

    firmName:{
        type:String,
        required:true,
        unique:true
    },
    area:{
        type:String,
        required:true  
    },
    category:{
        type:[
            {
                type:String,
                enum:['veg','non-veg','both']
            }
        ],

    },
    region:{
        type:[
            {
                type:String,
                enum:['north-indian','south-indian','chinese','bakery','italian','continental']
            }
        ]
    },
    offer:{
        type:String,

    },
    image:{
        type:String,
    },
    //relation with vendor
    vendor:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor'
        }
    ],
    //relation with product
    product:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
        }
    ] 

});

const Firm = mongoose.model('Firm', firmSchema);

module.exports = Firm;