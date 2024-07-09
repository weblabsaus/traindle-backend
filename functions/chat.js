const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'https://gorgeous-bonbon-fefab9.netlify.app'
}));

const messages = [];
let knowledgeBase = [
    { question: 'What is the capital of France?', answer: 'Paris' },
    { question: 'What is the largest planet in our solar system?', answer: 'Jupiter' },
    { question: 'What is the currency used in Japan?', answer: 'Yen' },
];

app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;
        messages.push(message);

        // Search the knowledge base for a matching question
        const matchingQuestion = knowledgeBase.find(item => item.question.toLowerCase() === message.toLowerCase());
        if (matchingQuestion) {
            res.json({ response: matchingQuestion.answer });
        } else {
            res.json({ response: 'I'm sorry, I don't have an answer for that. Please try training me on that topic.' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while processing the request.' });
    }
});

app.post('/train', (req, res) => {
    try {
        const { question, answer } = req.body;

        // Add the new question-answer pair to the knowledge base
        knowledgeBase.push({ question, answer });

        res.json({ message: 'AI training successful!' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while training the AI.' });
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
