const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());

// Prime Number Check
const isPrime = (num) => {
    if (num < 2) return false;
    for (let i = 2, sqrt = Math.sqrt(num); i <= sqrt; i++) {
        if (num % i === 0) return false;
    }
    return true;
};

// Perfect Number Check (Optimized to loop only to sqrt(num))
const isPerfect = (num) => {
    if (num < 2) return false;
    let sum = 1;
    for (let i = 2, sqrt = Math.sqrt(num); i <= sqrt; i++) {
        if (num % i === 0) {
            sum += i + (i !== num / i ? num / i : 0);
        }
    }
    return sum === num;
};

// Armstrong Number Check
const isArmstrong = (num) => {
    const absNum = Math.abs(num);
    const digits = absNum.toString().split("").map(Number);
    const power = digits.length;
    const sum = digits.reduce((acc, digit) => acc + Math.pow(digit, power), 0);
    return sum === absNum;
};

// Digit Sum Calculation
const digitSum = (num) => {
    return Math.abs(num).toString().split("").map(Number).reduce((acc, digit) => acc + digit, 0);
};

// API Endpoint
app.get("/api/classify-number", async (req, res) => {
    const { number } = req.query;
    const num = parseInt(number, 10);
    
    if (isNaN(num)) {
        return res.status(400).json({ error: true, number });
    }

    const properties = [];
    if (isArmstrong(num)) properties.push("armstrong");
    properties.push(num % 2 === 0 ? "even" : "odd");

    // Fetch fun fact asynchronously to improve response time
    const funFactPromise = axios.get(`http://numbersapi.com/${num}`).then(res => res.data).catch(() => "Fun fact not available.");

    const response = {
        number: num,
        is_prime: isPrime(num),
        is_perfect: isPerfect(num),
        properties,
        digit_sum: digitSum(num),
        fun_fact: await funFactPromise
    };

    res.json(response);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
