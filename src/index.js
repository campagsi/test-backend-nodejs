const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

router = express.Router();

router.get('/init', function(req, res) {
    return res.send('Bem vindo a api de teste');
});
app.use('/',router);

const authController = require('./controllers/authController')
const productController = require('./controllers/productController')
const categoryController = require('./controllers/categoryController')

app.use('/auth', authController);
app.use('/product', productController);
app.use('/category', categoryController);

app.listen(3001);