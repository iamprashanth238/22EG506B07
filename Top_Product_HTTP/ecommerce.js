const express = require("express");
const axios = require("axios");
const { model } = require("mongoose");

const app = express();
const router = express.Router();

const companies = ['AMZ', 'FLP', 'SNP', 'MYN', 'AZO'];
const categories = ["Phone", "Computer", "TV", "Earphone", "Tablet", "Charger", "Mouse", "Keypad", "Bluetooth", "Pendrive", "Remote", "Speaker", "Headset", "Laptop", "PC"];

async function fetchProducts(companyName, categoryName, topN, minPrice, maxPrice) {
    try {
        const apiUrl = `http://20.244.56.144/test/companies/${companyName}/categories/${categoryName}/products?top=${topN}&minPrice=${minPrice}&maxPrice=${maxPrice}`;

        const response = await axios.get(apiUrl);

        if (response.data && Array.isArray(response.data.products)) {
            return response.data.products;
        } else {
            console.error('Unexpected API response:', response.data);
            return [];
        }
    } catch (error) {
        console.error('Error fetching products:', error.message);
        return [];
    }
}

router.get("/products", async (req, res) => {
    const { companyName, categoryName, topN, minPrice, maxPrice } = req.query;

    if (!companies.includes(companyName)) {
        return res.status(400).json({ error: "Invalid company name" });
    }
    if (!categories.includes(categoryName)) {
        return res.status(400).json({ error: "Invalid category name" });
    }
    if (!topN || isNaN(topN) || topN <= 0) {
        return res.status(400).json({ error: "Invalid topN value" });
    }
    if (!minPrice || isNaN(minPrice) || minPrice < 0) {
        return res.status(400).json({ error: "Invalid minPrice value" });
    }
    if (!maxPrice || isNaN(maxPrice) || maxPrice < 0) {
        return res.status(400).json({ error: "Invalid maxPrice value" });
    }

    
    const products = await fetchProducts(companyName, categoryName, topN, minPrice, maxPrice);
    res.json({ products });
});

module.exports = router;
