
const mongoose = require('../database');

const ProductSchema = new mongoose.Schema({

    name: {
        type:String,
        require:true
    } ,
    desciption:{
        type:String,
        require:true
    } ,
    price : {
        unic:true,
        type:Number,
        require:true,        
    } ,
    stock: {
        type:Number,
        require:true,        
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        require:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require:true
    },
    createdAt:{
        type: Date,
        default: Date.now,
    }
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;