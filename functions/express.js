const express = require('express');
const cors = require('cors');

const app = express();

// Enable CORS
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// In-memory storage for trained questions and answers
let trainedData = [
  {
    question: 'what is the weather today?',
    answer: 'The weather today is sunny and warm.'
  },
  {
    question: 'what time is it?',
    answer: 'The current time is 2:30 PM.'
  },
  // Add more trained data here
];

// Define the main route for handling POST requests
app.post('/', (req, res) => {
  const { message } = req.body;
  let response = 'I do not have a response for that.';

  // Check if the message matches any trained questions
  const matchedData = trainedData.find(item => item.question.toLowerCase() === message.toLowerCase());
  if (matchedData) {
    response = matchedData.answer;
  }

  res.json({ response });
});

// Export the Express.js app as the Netlify Functions handler
exports.handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Function executed successfully' }),
  };
};

