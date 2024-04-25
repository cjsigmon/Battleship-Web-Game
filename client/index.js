import { io } from "socket.io-client";
import { displayText, showHighScores } from "./utils.js";
import { setupBoards } from "./setupboard.js";


const socket = io("http://localhost:3000");
let boards = setupBoards(320, 8, 40, socket);
let myPlayerName;
let activePlayer = false;


socket.on("connect", () => {
    displayText(socket.id);
});

socket.on("scores", (rows) => {
    console.table(rows);
    showHighScores(rows)
})

socket.on("game-begin", (name) => {
    myPlayerName = name;
    console.log("my name ", myPlayerName);
    if (myPlayerName == "p1") {
        boards.opponentBoard.makeActive();

    } 
});

socket.on('make-active', () => {
    boards.opponentBoard.makeActive();
});
socket.on('make-inactive', () => {
    boards.opponentBoard.makeInactive();
});

socket.on("ship-sunk", (shipName) => {
    alert(`${shipName} sunk!`);
})

socket.on('you-lost', () => {
    alert('GAME OVER. You lost.')
});

socket.on('you-won', () => {
    alert('GAME OVER. You won!')
});



socket.on("receive-fire", (rowName, colName) => {
    console.log(`${rowName}:${colName}`);
    boards.playerBoard.evaluateFire(rowName, colName);
});

socket.on("my-fire-hit", (rowName, colName) => {
    boards.opponentBoard.getTile(rowName, colName).hit();
});

socket.on("my-fire-missed", (rowName, colName) => {
    boards.opponentBoard.getTile(rowName, colName).miss();
});









const sendMessageBtn = document.getElementById("sendMessageBtn");
const messageField = document.getElementById("messageField");
sendMessageBtn.addEventListener("click", () => {
    socket.emit("send-message", messageField.value);
})

socket.on("receive-message", (arg1) => {
    displayText(arg1);
});


