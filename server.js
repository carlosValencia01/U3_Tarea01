const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const wagner = require('wagner-core');
const path = require('path');

let app = express();

require('./models/models')(wagner);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Method','GET,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Rquested-With, Content-Type, Accept, Authorization');
    next();
});

const urlBase = "/api/v1/";

const user = require('./routers/user.router')(wagner);
const brand = require('./routers/brand.router')(wagner);
const product = require('./routers/product.router')(wagner);

app.use(urlBase+'usuarios',user);
app.use(urlBase+'brands',brand);
app.use(urlBase+'products',product);

module.exports = app;