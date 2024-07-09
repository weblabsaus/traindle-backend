const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'https://gorgeous-bonbon-fefab9.netlify.app'
}));

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;

        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: message,
            max_tokens: 2048,
            n: 1,
            stop: null,
            temperature: 0.7,
        });

        res.json({ response: response.data.choices[0].text.trim() });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while processing the request.' });
    }
});

app.post('/train', async (req, res) => {
    try {
        const { question, answer } = req.body;

        // Train the AI model using the provided question and answer
        await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: `Q: ${question}\nA: ${answer}`,
            max_tokens: 1,
            n: 1,
            stop: null,
            temperature: 0,
        });

        res.json({ message: 'AI training successful!' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while training the AI.' });
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
