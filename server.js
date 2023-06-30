const express = require('express');
const cors = require('cors');
require('isomorphic-fetch');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/run-code', async (req, res) => {
  const code = req.body.code;

  const requestOptions = {
    method: 'POST',
    headers: {
      'Authorization': 'Token b36ce996-6164-4969-a24f-6053a8e16018',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ files: [{ name: 'Main.java', content: code }] })
  };

  try {
    const response = await fetch('https://run.glot.io/languages/java/latest', requestOptions);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while executing the code.' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
