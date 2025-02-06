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

// Perfect Number Check
const isPerfect = (num) => {
    if (num < 2) return false;
    let sum = 1, sqrt = Math.sqrt(num);
    for (let i = 2; i <= sqrt; i++) {
        if (num % i === 0) sum += i + (i !== num / i ? num / i : 0);
    }
    return sum === num;
};

// Armstrong Number Check (Optimized)
const isArmstrong = (num) => {
    let absNum = Math.abs(num), sum = 0, temp = absNum, power = Math.floor(Math.log10(absNum)) + 1;
    while (temp > 0) {
        sum += Math.pow(temp % 10, power);
        temp = Math.floor(temp / 10);
    }
    return sum === absNum;
};

// Sum of Digits Calculation (Optimized)
const digitSum = (num) => {
    let sum = 0;
    num = Math.abs(num);
    while (num > 0) {
        sum += num % 10;
        num = Math.floor(num / 10);
    }
    return sum;
};

// API Endpoint
app.get("/api/classify-number", async (req, res) => {
    const number = req.query.number;
    const num = parseInt(number, 10);

    if (isNaN(num)) {
        return res.status(400).json({ error: true, number });
    }

    const properties = [];
    if (isArmstrong(num)) properties.push("armstrong");
    properties.push(num % 2 === 0 ? "even" : "odd");

    try {
        // Fetch fun fact in parallel with number classification
        const [funFactResponse] = await Promise.all([
            axios.get(`http://numbersapi.com/${num}/math`)
        ]);

        res.json({
            number: num,
            is_prime: isPrime(num),
            is_perfect: isPerfect(num),
            properties,
            digit_sum: digitSum(num),
            fun_fact: funFactResponse.data
        });
    } catch (error) {
        res.status(500).json({ error: "Could not fetch fun fact." });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
