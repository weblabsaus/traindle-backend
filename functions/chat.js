const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'https://gorgeous-bonbon-fefab9.netlify.app'
}));

const messages = [];

app.post('/chat', (req, res) => {
    try {
        const { message } = req.body;
        messages.push(message);
        res.json({ response: `You said: ${message}` });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while processing the request.' });
    }
});

app.get('/chat', (req, res) => {
    try {
        res.json({ messages });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while fetching the messages.' });
    }
});

exports.handler = async (event) => {
    return await new Promise((resolve, reject) => {
        app(event, {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'https://gorgeous-bonbon-fefab9.netlify.app',
                'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'
            },
            body: JSON.stringify({ message: 'Function executed successfully' }),
        }, (err, res) => {
            if (err) {
                console.error('Error:', err);
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};
