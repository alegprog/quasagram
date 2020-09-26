// dependencies

const express = require('express')

// configs

const app = express()
const port = 3000

// Endpoints

app.get('/', (request, response) => {
  response.send('I love nodejs 23!')
})

// listen

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
