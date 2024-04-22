const io = require('socket.io')(3000);
console.log('http://localhost:3000')

io.on('connection', socket => {
    console.log(socket.id)
})