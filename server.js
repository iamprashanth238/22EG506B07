const express = require("express");
const app = express();
const axios = require('axios');



app.use(express.json());

app.listen(3000, ()=>{
    console.log("Server is running");
});