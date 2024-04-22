const io = require('socket.io')(3000, {
    cors: {
        origin: ['http://localhost:8080']
    }
}
);



io.on("connection", socket => {
    console.log(socket.id);
    socket.on("send-message", (arg1) => {
        socket.broadcast.emit("receive-message", arg1);
    });

    socket.on("fire", () => {
        socket.broadcast.emit("receive-fire");
    })
})