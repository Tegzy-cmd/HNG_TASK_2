# Number Classification API

## Description

This is a simple Node.js API that classifies a given number based on mathematical properties and provides a fun fact about the number. The API can determine if a number is:

- Prime
- Perfect
- Armstrong (Narcissistic)
- Odd or Even
- Sum of its digits

Additionally, it fetches a fun fact about the number from the Numbers API.

## Features

- Determines prime, perfect, and Armstrong numbers.
- Calculates the sum of digits.
- Identifies odd/even properties.
- Fetches a fun fact about the number.
- Handles errors and invalid inputs gracefully.
- Supports Cross-Origin Resource Sharing (CORS).

## API Endpoint

### **GET /api/classify-number**

#### **Request Parameters:**

| Parameter | Type  | Required | Description |
|-----------|-------|----------|-------------|
| number    | int   | Yes      | The number to classify |

#### **Example Request:**

```
GET /api/classify-number?number=371
```

#### **Success Response:**

```json
{
    "number": 371,
    "is_prime": false,
    "is_perfect": false,
    "properties": ["armstrong", "odd"],
    "digit_sum": 11,
    "fun_fact": "371 is an Armstrong number because 3^3 + 7^3 + 1^3 = 371"
}
```

#### **Error Response (Invalid Input):**

```json
{
    "number": "alphabet",
    "error": true
}
```

## Installation & Setup

### **Prerequisites**

- Node.js installed
- Git for cloning the repository

### **Steps to Run Locally**

1. Clone the repository:

   ```sh
   git clone https://github.com/Tegzy-cmd/HNG_TASK_2.git
   cd HNG_TASK_2
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the server:

   ```sh
   npm start
   ```

4. The API will be available at:
   [http://localhost:3000/api/classify-number?number=371](http://localhost:3000/api/classify-number?number=371)

## Deployment

To deploy your API, use platforms like:

- **Render**
- **Railway**
- **Vercel**
- **Heroku**

## Technologies Used

- **Node.js**
- **Express.js**
- **Axios (for fetching fun facts)**
- **CORS (Cross-Origin Resource Sharing)**

## License

This project is open-source and available under the MIT License.

## Contributors

- **Omoraka Benjamin Oghenetega** (GitHub: [Tegzy-cmd](https://github.com/tegzy-cmd))