const express = require('express');
const bcrypt = require('bcryptjs');
const token = require('jsonwebtoken');
const authConfig = require('../config/auth');
const Category = require('../models/category');

// autenticação
const authMiddleware = require('../middlewares/auth');

router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
    
    try{
     
        const product = await Category.find();

    return res.status(200).send(product);
    } catch {
        return res.status(400).send({error:  "error list category"});
    }
});

router.get('/:categoryId', async (req, res) => {


    try{

        const product = await Product.findById(req.params.categoryId).populate('user').populate('category');

        return res.status(200).send(product);
    } catch {
        return res.status(400).send({error:  "error load products"});
    }

})

router.post('/', async (req, res) => {
    
    try{
    
        const Product = await Category.create(req.body);

        return res.send(Product);
     }catch(err){
         return res.status(400).send({error:  "error creating new category"});
     };
})

router.put('/:categoryId', async (req, res) => {


    try{

        const product = await Product.findById(req.params.categoryId).populate('user');

        return res.status(200).send(product);
    } catch {
        return res.status(400).send({error:  "error load category"});
    }

})

router.delete('/:categoryId', async (req, res) => {


    try{

        const product = await Product.findByIdAndRemove(req.params.categoryId);

        return res.status(200).send(product);
    } catch {
        return res.status(400).send({error:  "error deleting category"});
    }

})

module.exports = router;