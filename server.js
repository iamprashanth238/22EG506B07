const axios = require("axios");
const express = require("express");
const router = express.Router(); 
const app = express();

app.use(express.json()); 
app.use('/', router); 

// const calculator = require('./Average_Calculator_HTTP/calculator');
// app.use('/',calculator);

const ecommerce = require('./Top_Product_HTTP/ecommerce');
app.use('/api',ecommerce);

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
