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
    let absNum = Math.abs(num); // Ignore negative sign for Armstrong check
    let sum = 0, temp = absNum, power = 0;

    // Determine the number of digits
    while (temp > 0) {
        temp = Math.floor(temp / 10);
        power++;
    }

    // Reset temp and calculate Armstrong sum
    temp = absNum;
    while (temp > 0) {
        sum += Math.pow(temp % 10, power); // Extract last digit and raise to power
        temp = Math.floor(temp / 10); // Remove last digit
    }

    return sum === absNum;
};

// Calculate sum of digits (Ignoring the negative sign)
const digitSum = (num) => {
    let sum = 0;
    num = Math.abs(num);
    while (num > 0) {
        sum += num % 10; // Extract last digit and add to sum
        num = Math.floor(num / 10); // Remove last digit
    }
    return sum;
};

// API Endpoint
app.get("/api/classify-number", async (req, res) => {
    const number = req.query.number; // Get number param
    const num = parseInt(number, 10); // Convert number to integer
    
    if (isNaN(num)) {
        return res.status(400).json({error: true, number });
    }

    const properties = [];
    if (isArmstrong(num)) properties.push("armstrong");
    if (num % 2 === 0) properties.push("even");
    else properties.push("odd");

    try {
        const fetchFact = await axios.get(`http://numbersapi.com/${num}/math`);
        const funFact = fetchFact.data;

        res.json({
            number: num,
            is_prime: isPrime(num),
            is_perfect: isPerfect(num),
            properties,
            digit_sum: digitSum(num),
            fun_fact: await funFact
        });
    } catch (error) {
        res.status(500).json({ error: "Could not fetch fun fact." });
    }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});