import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // to parse JSON bodies

// Replace with actual Gemini API URL and endpoint
const geminiApiUrl = 'https://api.gemini.com/v1/chat'; // Replace `your-endpoint` with the actual API endpoint

// Your Gemini API key
const apiKey = 'AIzaSyDuZEGy2fLW3TE1ns-ya41d_tf4IaPV2Vw/chat'; // Replace with your actual Gemini API key

// Route to handle chat messages from the client
app.post('/chat', async (req, res) => {
    const { message } = req.body;

    try {
        // Make the request to Gemini API
        const response = await fetch(geminiApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`, // Include the API key in the header
            },
            body: JSON.stringify({ message }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Assume the response from the Gemini API has a `reply` field
        res.status(200).json({ reply: data.reply });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to communicate with Gemini API' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
