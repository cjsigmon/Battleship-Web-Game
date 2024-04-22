import { io } from "socket.io-client";
import { displayText } from "./utils.js";
import { setupBoards } from "./setupboard.js";


const socket = io("http://localhost:3000");
socket.on("connect", () => {
    displayText(socket.id);
});


const sendMessageBtn = document.getElementById("sendMessageBtn");
const messageField = document.getElementById("messageField");
sendMessageBtn.addEventListener("click", () => {
    socket.emit("send-message", messageField.value);
})

socket.on("receive-message", (arg1) => {
    displayText(arg1);
})


setupBoards(480, 8, 60);