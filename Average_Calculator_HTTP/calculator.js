const axios = require("axios");
const express = require("express");
const router = express.Router(); 
const app = express();

app.use(express.json()); 

router.get('/:number/:numberid', async (req, res) => { 
    try {
        const number = req.params.number;
        const numberId = req.params.numberid; 

        console.log("number: ", number);
        console.log("numberId:", numberId);

        if(numberId == 'e'){
            let numbers = [];
            let windowsPrevState = [];
            let windowsCurrState = [];
            for(let i=1;i<number;i++){
                if(i%2==0){
                    numbers.push(i);
                }
            }

            i


        }else if(numberId == 'p'){

        }else if(numberId == 'f'){

        }else{

        }

    } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong"); 
    }
});

module.exports = router;