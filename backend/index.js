// dependencies
/*jshint esversion: 6 */

const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});
const inspect = require('util').inspect;
const Busboy = require('busboy');

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

app.post('/posts', (request, response) => {
  let busboy = new Busboy({ headers: request.headers });

  let fields = {};

  busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
    file.on('data', function(data) {
      console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
    });
    file.on('end', function() {
      console.log('File [' + fieldname + '] Finished');
    });
  });
  busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
    // console.log('Field [' + fieldname + ']: value: ' + inspect(val));
    fields[fieldname] = val;
  });
  busboy.on('finish', function() {
    // console.log('fields: ', fields);
    db.collection('posts').doc(fields.id).set({
      id: fields.id,
      caption: fields.caption,
      location: fields.location,
      date: parseInt(fields.date),
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/quasagram-861bf.appspot.com/o/VRifq.jpg?alt=media&token=68e00c97-06bf-4791-892f-086869b4a7d9'
    });
    console.log('Done parsing form!');
    // response.writeHead(303, { Connection: 'close', Location: '/' });
    response.end('Done parsing form');
  });
  request.pipe(busboy);
});

// listen

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
