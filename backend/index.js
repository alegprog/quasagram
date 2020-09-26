// dependencies
/*jshint esversion: 6 */

const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});

// configs

const app = express();
const port = process.env.PORT || 3000;
app.use(cors);

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Endpoints

app.get('/posts', (request, response) => {
  // response.set('Access-Control-Allow-Origin', '*');

  let posts = [];

  db.collection('posts')
    .orderBy('date', 'desc')
    .get()
    .then(snapshot => {
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
