const clients = {};
let players = {}; // opponent: scoket.id of the opponent, name = "p2" | "p1", socket: player's socket
let unmatched;
import { Server } from 'socket.io';
import { setupDB } from './setup_db.mjs';
import { db } from './db.mjs';
import { runAPI } from './api.mjs';


runAPI();

const io = new Server(3000, {
    cors: {
        origin: true
    }
});


const rows = await setupDB();


io.on("connection", async socket => {
    let id = socket.id;
    clients[socket.id] = socket;

    socket.on("disconnect", () => {// Bind event for that socket (player)
        console.log("Client disconnected. ID: ", socket.id);
        delete clients[socket.id];
        socket.broadcast.emit("clientdisconnect", id);
    });

    join(socket); // Fill 'players' data structure

    socket.emit("scores", rows)

    if (opponentOf(socket)) { // If the current player has an opponent the game can begin
        socket.emit("game-begin", players[socket.id].name);

        opponentOf(socket).emit("game-begin", players[opponentOf(socket).id].name);
    }

    socket.on("ships-placed", () => {
        players[socket.id].placedShips = true;

        if (opponentOf(socket) && players[opponentOf(socket).id].placedShips) { // If the current player has an opponent the game can begin
            socket.emit("disable-placing-start-gameplay", players[socket.id].name);
    
            opponentOf(socket).emit("disable-placing-start-gameplay", players[opponentOf(socket).id].name);
        }
    })



    socket.on("fire", function(x, y) {
        if (!opponentOf(socket)) {
            // This shouldn't be possible since if a player doens't have an opponent the game board is disabled
            return;
        }

        opponentOf(socket).emit("receive-fire", x, y); // Emit for the opponent

    });

    socket.on("hit", function(rowName, colName) {
        opponentOf(socket).emit("my-fire-hit", rowName, colName); // Emit for the opponent
        socket.emit('you-got-hit')
        socket.emit("make-active");
        opponentOf(socket).emit("make-inactive");
    });

    socket.on("miss", function(rowName, colName) {
        opponentOf(socket).emit("my-fire-missed", rowName, colName); // Emit for the opponent
        socket.emit("make-active");
        opponentOf(socket).emit("make-inactive");
    });

    socket.on("ship-sunk", (shipName) => {
        opponentOf(socket).emit('you-sunk-opponent', shipName);
        socket.emit('my-ship-sunk', shipName);
    });

    socket.on("game-over", () => {
        socket.emit('you-lost');
        opponentOf(socket).emit('you-won');
    })



    // Event to inform player that the opponent left
    socket.on("disconnect", function() {
        if (opponentOf(socket)) {
        opponentOf(socket).emit("opponent.left");
        }
    });




    socket.on("send-message", (arg1) => {
        socket.broadcast.emit("receive-message", arg1);
    });
})

function join(socket) {
    players[socket.id] = {
        opponent: unmatched,
        name: "p1",
        socket: socket,
        placedShips: false
    };

    // If 'unmatched' is defined it contains the socket.id of the player who was waiting for an opponent
    // then, the current socket is player #2
    if (unmatched) { 
        players[socket.id].name = "p2";
        players[unmatched].opponent = socket.id;
        unmatched = null;
    } else { //If 'unmatched' is not define it means the player (current socket) is waiting for an opponent (player #1)
        unmatched = socket.id;
    }
}

function opponentOf(socket) {
    if (!players[socket.id].opponent) {
        return;
    }
    return players[players[socket.id].opponent].socket;
}