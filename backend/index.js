// dependencies
/*jshint esversion: 6 */

const express = require('express');

// configs

const app = express();
const port = process.env.PORT || 3000;

// Endpoints

app.get('/posts', (request, response) => {
  let posts = [
    {
      caption: 'Golden Gate Bridge',
      location: 'San Francisco'
    },
    {
      caption: 'London Eye',
      location: 'London'
    },
  ];
  response.send(posts);
});

// listen

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
