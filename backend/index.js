// dependencies
/*jshint esversion: 6 */

const express = require('express');
const admin = require('firebase-admin');


// configs

const app = express();
const port = process.env.PORT || 3000;

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Endpoints

app.get('/posts', (request, response) => {
  response.set('Access-Control-Allow-Origin', '*');

  let posts = [];

  db.collection('posts').get().then(snapshot => {
    snapshot.forEach(doc => {
      posts.push(doc.data());
    });
    response.send(posts);
  });
});

// listen

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
