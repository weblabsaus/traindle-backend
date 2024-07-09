const express = require('express');
const cors = require('cors');
const chatApp = require('./chat');

const app = express();

// Enable CORS
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Use the chat app
app.use(chatApp);

// Export the Express.js app as the Netlify Functions handler
exports.handler = async (event) => {
  return await new Promise((resolve, reject) => {
    app(event, {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
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
