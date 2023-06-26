const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

import('node-fetch').then(nodeFetch => {
  app.post('/run-code', async (req, res) => {
    const code = req.body.code;

    const request = new nodeFetch.Request('https://run.glot.io/languages/java/latest', {
      method: 'POST',
      headers: {
        'Authorization': 'Token b36ce996-6164-4969-a24f-6053a8e16018',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({files: [{"name": "Main.java", "content": code}]})
    });

    const response = await nodeFetch.default(request);
    const data = await response.json();

    res.json(data);
  });

  app.listen(3000, () => console.log('Server is running on port 3000'));
});
