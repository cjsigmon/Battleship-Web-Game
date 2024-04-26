import { io } from "socket.io-client";
import { displayText, showHighScores, winScreen, getGlobalScore, setGlobalScore, setHelper, setAlert } from "./utils.js";
import { setupBoards } from "./setupboard.js";


const socket = io("http://localhost:3000");
let boards = setupBoards(320, 8, 40, socket);
let myPlayerName;
let activePlayer = false;


socket.on("connect", () => {
    console.log("socket.id", socket.id);
});

socket.on("scores", (rows) => {
    console.table(rows);
    showHighScores();
})

socket.on("game-begin", (name) => {
    myPlayerName = name;
    setGlobalScore(0);
    console.log("my name ", myPlayerName);
    setHelper(`Welcome ${myPlayerName}`, "Click on a ship, use arrow keys to adjust position, then click Place Ship.")
});

socket.on("disable-placing-start-gameplay", () => {
    setAlert("Game has begun!")
    if (myPlayerName == "p1") {
        boards.opponentBoard.makeActive();
    } else {
        setHelper("Opponent's turn", "Please wait for them to finish their move.");

    }

})

socket.on('make-active', () => {
    boards.opponentBoard.makeActive();
});
socket.on('make-inactive', () => {
    boards.opponentBoard.makeInactive();
});

socket.on("you-sunk-opponent", (shipName) => {

    setAlert(`You sunk opponent's ${shipName}!`);
    setGlobalScore(getGlobalScore() +100);
});

socket.on("my-ship-sunk", (shipName) => {
    setAlert(`your ${shipName} sunk!`);
    setGlobalScore(getGlobalScore() -10);
})

socket.on('you-lost', () => {
    setHelper('GAME OVER. You lost.');
    setGlobalScore(0);
    boards.opponentBoard.makeActive();
});

socket.on('you-won', async () => {
    setHelper(`GAME OVER. You won! Score: ${getGlobalScore()}`)
    await winScreen();
});



socket.on("receive-fire", (rowName, colName) => {
    console.log(`${rowName}:${colName}`);
    boards.playerBoard.evaluateFire(rowName, colName);
});

socket.on("you-got-hit", (rowName, colName) => {
    boards.opponentBoard.getTile(rowName, colName).hit();
    setAlert("You got hit!")
    setGlobalScore(getGlobalScore() - 10);
});

socket.on("my-fire-hit", (rowName, colName) => {
    setAlert("Hit!")
    boards.opponentBoard.getTile(rowName, colName).hit();
    setGlobalScore(getGlobalScore() + 10);
});

socket.on("my-fire-missed", (rowName, colName) => {
    setAlert("Your fire missed")

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


