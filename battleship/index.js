const express = require('express')
var session = require('express-session');

const app = express()
const port = 3000
const path = require('path')


// app.use(express.static(path.join(__dirname, 'frontend')));
app.use(session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: 'keyboard cat'
  }));




app.post('/', (req, res) => {
    res.send('Got a POST request')
})

app.put('/user', (req, res) => {
    res.send('Got a PUT request at /user')
})

app.delete('/user', (req, res) => {
    res.send('Got a DELETE request at /user')
})

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`)
})