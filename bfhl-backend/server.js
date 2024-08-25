const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

// Helper function to separate numbers and alphabets
function separateData(data) {
    let numbers = [];
    let alphabets = [];
    let highestLowercaseAlphabet = null;

    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else if (typeof item === 'string') {
            alphabets.push(item);
            if (item === item.toLowerCase() && (highestLowercaseAlphabet === null || item > highestLowercaseAlphabet)) {
                highestLowercaseAlphabet = item;
            }
        }
    });

    return { numbers, alphabets, highestLowercaseAlphabet };
}

// POST /bfhl
app.post('/bfhl', (req, res) => {
    const { data } = req.body;

    if (!data || !Array.isArray(data)) {
        return res.status(400).json({ is_success: false, error: "Invalid input" });
    }

    const { numbers, alphabets, highestLowercaseAlphabet } = separateData(data);

    res.json({
        is_success: true,
        user_id: "john_doe_17091999", // Replace with actual user ID format
        email: "john@xyz.com", // Replace with actual email
        roll_number: "ABCD123", // Replace with actual roll number
        numbers,
        alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : []
    });
});

// GET /bfhl
app.get('/bfhl', (req, res) => {
    res.json({ operation_code: 1 });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
