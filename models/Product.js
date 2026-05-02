
mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    category:{
        type:[
            {
                type: String,
                enum:['veg', 'non-veg', 'beverages', 'desserts', 'snacks']
            }
        ]
    },
    image:{
        type: String,
        
    },
    bestsellor:{
        type: String,
        
    },
    description:{
        type: String,            
    },

    //relation with firm
    firm:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Firm',
        // required: true
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;