require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

app.get('/', (req, res) => {
  console.log(process.env.PORT, process.env.DB_URL);
  res.send('Hello, World!');
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});