// dependencies
/*jshint esversion: 6 */

const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});
const inspect = require('util').inspect;
const Busboy = require('busboy');
const path = require('path');
const os = require('os');
const fs = require('fs');
const UUID = require('uuid-v4');

// configs

const app = express();
const port = process.env.PORT || 3000;
app.use(cors);

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "quasagram-861bf.appspot.com"
});

const bucket = admin.storage().bucket();

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
  let uuid = UUID();

  let busboy = new Busboy({ headers: request.headers });

  let fields = {};
  let fileData = {};

  busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
    // /tmp/fdsfsdf.png
    const filepath = path.join(os.tmpdir(), filename);
    file.pipe(fs.createWriteStream(filepath));
    fileData = { filepath, mimetype };
  });
  busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
    // console.log('Field [' + fieldname + ']: value: ' + inspect(val));
    fields[fieldname] = val;
  });
  busboy.on('finish', function() {
    // console.log('fields: ', fields);
    bucket.upload(
      fileData.filepath,
      {
        uploadType: 'media',
        metadata: {
          metadata: {
            contentType: fileData.mimetype,
            firebaseStorageDownloadTokens: uuid
          }
        }
      },
      (error, uploadedFile) => {
        if (!error) {
          createDocument(uploadedFile);
        }
      }
    );

    function createDocument(uploadedFile) {
      db.collection('posts').doc(fields.id).set({
        id: fields.id,
        caption: fields.caption,
        location: fields.location,
        date: parseInt(fields.date),
        imageUrl: `https://firebasestorage.googleapis.com/v0/b/${ bucket.name }/o/${ uploadedFile.name }?alt=media&token=${ uuid }`
      }).then(() => {
        response.send(`Post added: ${ fields.id }`)
      });
    }
  });

  request.pipe(busboy);
});

// listen

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
