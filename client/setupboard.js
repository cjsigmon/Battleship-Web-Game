import { Tile } from "./Tile.js";
import { Board } from "./Board.js";
import { Ship } from "./Ship.js";


export function setupBoards(boardSize, squaresPerSide, squareSize, socket) {
    const background = document.getElementById("background");
    const opponentBoard = new Board(boardSize, background, "opponent", squaresPerSide, squareSize, socket);
    const playerBoard = new Board(boardSize, background, "player", squaresPerSide, squareSize, socket);
    const AircraftCarrier = new Ship(playerBoard, squareSize, 5, "horizantal", "unplaced", "AircraftCarrier");
    const Battleship = new Ship(playerBoard, squareSize, 4, "horizantal", "unplaced", "BattleShip");
    const Cruiser = new Ship(playerBoard, squareSize, 3, "horizantal", "unplaced", "Cruiser");
    const PatrolBoat = new Ship(playerBoard, squareSize, 2, "horizantal", "unplaced", "PatrolBoat");
    const Submarine = new Ship(playerBoard, squareSize, 2, "horizantal", "unplaced", "Submarine");




    return {
        playerBoard: playerBoard,
        opponentBoard: opponentBoard
    };
}