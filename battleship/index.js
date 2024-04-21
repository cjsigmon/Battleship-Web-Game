const express = require('express')
const app = express()
const port = 3000
const path = require('path')


app.use(express.static(path.join(__dirname, 'frontend')));



// app.get('/', (req, res) => {
//   res.send("hello");
//   app.use(express.static(path.join(__dirname, 'frontend')));

// })

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