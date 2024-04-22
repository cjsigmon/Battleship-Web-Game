import { io } from "socket.io-client";
import { displayText } from "./utils.js";
import { setupBoards } from "./setupboard.js";


const socket = io("http://localhost:3000");
let boards = setupBoards(320, 8, 40, socket);
let myPlayerName;
let activePlayer = false;


socket.on("connect", () => {
    displayText(socket.id);
});

socket.on("game-begin", (name) => {
    myPlayerName = name;
    console.log("my name ", myPlayerName);
    if (myPlayerName == "p1") {
        boards.opponentBoard.makeActive();

    } 
})

socket.on("hit", () => {
    alert("hit!")
})

socket.on("receive-fire", (rowName, colName) => {
    console.log(`${rowName}:${colName}`);
    boards.playerBoard.evaluateFire(rowName, colName);
    socket.emit("hit");
})









const sendMessageBtn = document.getElementById("sendMessageBtn");
const messageField = document.getElementById("messageField");
sendMessageBtn.addEventListener("click", () => {
    socket.emit("send-message", messageField.value);
})

socket.on("receive-message", (arg1) => {
    displayText(arg1);
});


