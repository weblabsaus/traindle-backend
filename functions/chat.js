const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all origins
app.use(cors());
app.use(express.json());

// In-memory storage for trained questions and answers
let trainedData = [];

app.post('/chat', (req, res) => {
    const { message } = req.body;
    let response = 'I do not have a response for that.';

    // Check if the message matches any trained questions
    const matchedData = trainedData.find(item => item.question.toLowerCase() === message.toLowerCase());
    if (matchedData) {
        response = matchedData.answer;
    }

    res.json({ response });
});

app.post('/train', (req, res) => {
    const { question, answer } = req.body;

    // Check if the question already exists in the trained data
    const existingItem = trainedData.find(item => item.question.toLowerCase() === question.toLowerCase());
    if (existingItem) {
        existingItem.answer = answer;
    } else {
        trainedData.push({ question, answer });
    }

    res.json({ response: answer });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
