const express = require('express');
const bcrypt = require('bcryptjs');
const token = require('jsonwebtoken');
const authConfig = require('../config/auth');
const Product = require('../models/product');
const Category = require('../models/category');

// autenticação
const authMiddleware = require('../middlewares/auth');

router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
    
    try{
     
        const product = await Product.find().populate('user').populate('category');

    return res.status(200).send(product);
    } catch {
        return res.status(400).send({error:  "error list products"});
    }
});

router.post('/', async (req, res) => {
    
    try{
        console.log(req.body);
        const product = await Product.create({ ...req.body, user:req.userId});

        return res.send(product);
     }catch(err){
         return res.status(400).send({error:  "error creating new product"});
     };
})

router.get('/:productId', async (req, res) => {


    try{

        
        //const product = await Product.findById(req.params.productId).populate('user').populate('category');

        return res.status(200).send(product);
    } catch {
        return res.status(400).send({error:  "error load products"});
    }

})

router.post('/find', async (req, res) => {

    //try{
        console.log(req.body);
        const product = await Product.aggregate([
            {
                $lookup:{
                    from: "categories",                     
                    localField: "category",
                    foreignField: "_id",
                    as : "category"
                },
            },
            {
                 $match: { 
                     "category.name": { $regex: '.*'+req.body.category+'.*', $options: "si" },
                     "name": { $regex: '.*'+req.body.produto+'.*', $options: "si" }
                 },
                
            },
        ]);
        
        //const product = await Product.find({'name' : new RegExp(req.body.produto, 'i')}).populate('user').populate('category');

        return res.status(200).send(product);
    // } catch {
    //     return res.status(400).send({error:  "error load products"});
    // }

})

router.delete('/:productId', async (req, res) => {


    console.log(req.params.productId);
    try{

        const product = await Product.findByIdAndRemove(req.params.productId);

        return res.status(200).send(product);
    } catch {
        return res.status(400).send({error:  "error deleting products"});
    }

})

module.exports = router;