// live url: https://hng-task-2-murex.vercel.app/api/classify-number?number="pass in any number of your choice"
const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
// Port
const PORT = process.env.PORT || 8080;

//Middleware
app.use(cors());

// Parity functions
const isPrime = (num) => {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
};

const isPerfect = (num) => {
    let sum = 1;
    for (let i = 2; i <= num / 2; i++) {
        if (num % i === 0) sum += i;
    }
    return sum === num && num !== 1;
};

/**
 * Checks if a given number is an Armstrong number.
 * An Armstrong number (also known as a narcissistic number) is a number that is equal to the sum of its own digits each raised to the power of the number of digits.
 *
 * @param {number} num - The number to check.
 * @returns {boolean} - Returns true if the number is an Armstrong number, otherwise false.
 */
const isArmstrong = (num) => {
    const absNum = Math.abs(num); // Ignore negative sign for Armstrong check
    let sum = 0;
    let digits = absNum.toString().split("").map(Number);
    let power = digits.length;
    digits.forEach(digit => sum += Math.pow(digit, power));
    return sum === absNum;
};

// Calculate sum of digits (Ignoring the negative sign)
const digitSum = (num) => {
    return Math.abs(num).toString().split("").map(Number).reduce((a, b) => a + b, 0);
};

// API Endpoint
app.get("/api/classify-number", async (req, res) => {
    const { number } = req.query; // Get number from query string by detructuring object
    const num = parseInt(number, 10); // Convert number to integer
    
    if (isNaN(num)) {
        return res.status(400).json({error: true, number });
    }

    const properties = [];
    if (isArmstrong(num)) properties.push("armstrong");
    if (num % 2 === 0) properties.push("even");
    else properties.push("odd");

    try {
        const fetchFact = await axios.get(`http://numbersapi.com/${num}`);
        const funFact = fetchFact.data;

        res.json({
            number: num,
            is_prime: isPrime(num),
            is_perfect: isPerfect(num),
            properties,
            digit_sum: digitSum(num),
            fun_fact: funFact
        });
    } catch (error) {
        res.status(500).json({ error: "Could not fetch fun fact." });
    }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});