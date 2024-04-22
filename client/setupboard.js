import { Tile } from "./Tile.js";
import { Board } from "./Board.js";


export function setupBoards(boardSize, squaresPerSide, squareSize, socket) {
    const background = document.getElementById("background");
    const opponentBoard = new Board(boardSize, background, "opponent", squaresPerSide, squareSize, socket);
    const playerBoard = new Board(boardSize, background, "player", squaresPerSide, squareSize, socket);


}