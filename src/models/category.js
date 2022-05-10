
const mongoose = require('../database');

const CategorySchema = new mongoose.Schema({

    name: {
        type:String,
        require:true
    } ,
    description: {
        unic:true,
        type:String,
        require:true,
        lowwercase:true
    } ,    
    
    active: {
        type:Number,
        require:true,        
    },
    
});

const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;