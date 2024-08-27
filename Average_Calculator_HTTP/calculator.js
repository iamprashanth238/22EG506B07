const axios = require("axios");
const express = require("express");
const router = express.Router();
const app = express();

const WINDOW_SIZE = 10; 
let numberWindow = []; 

const calculateAverage = (numbers) => {
    if (numbers.length === 0) return 0;
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return sum / numbers.length;
};

const fetchNumbers = async (numberId) => {
    try {
        const response = await axios.get(`https://testserver.com/api/numbers/${numberId}`, { timeout: 500 });
        return response.data.numbers;
    } catch (error) {
        console.error("Error fetching numbers:", error.message);
        return [];
    }
};

router.get('/numbers/:numberid', async (req, res) => {
    try {
        const numberId = req.params.numberid;

        if (!["p", "f", "e", "r"].includes(numberId)) {
            return res.status(400).json({ error: "Invalid numberId. Use 'p', 'f', 'e', or 'r'." });
        }

        const numbers = await fetchNumbers(numberId);
        const uniqueNumbers = [...new Set(numbers)]; 

        const windowPrevState = [...numberWindow]; 

        uniqueNumbers.forEach(num => {
            if (!numberWindow.includes(num)) {
                if (numberWindow.length >= WINDOW_SIZE) {
                    numberWindow.shift(); 
                }
                numberWindow.push(num);
            }
        });

        const windowCurrState = [...numberWindow]; 
        const avg = calculateAverage(numberWindow);

        const response = {
            numbers: uniqueNumbers,
            windowPrevState: windowPrevState,
            windowCurrState: windowCurrState,
            avg: avg.toFixed(2)
        };

        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong");
    }
});

