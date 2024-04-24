import { nextCharacter } from "./utils"
import { letterToNumber } from "./utils"

export class Ship {
    #playerBoard
    #squareSize
    #tilesLength
    #orientation
    #status
    #name
    #src
    #element
    #rowName
    #colName
    #height
    #width
    #x
    #y
    #occupiedTiles = []
    static shipsSelect = document.getElementById("shipsSelect");
    static allShips = [];

    constructor(playerBoard, squareSize, tilesLength, orientation, status, name) {
        this.#playerBoard = playerBoard;
        this.#squareSize = squareSize;
        this.#tilesLength = tilesLength;
        this.#orientation = orientation;
        this.#status = status;
        this.#name = name;
        this.#src = `./img/Battleships/${orientation}/${name}.png`;
        this.#element = document.createElement('img');
        this.#element.src = this.#src;
        if (status == "unplaced") {
            Ship.shipsSelect.append(this.#element)
        }
        this.renderImgDimensions();
        this.addClickSelect();


        Ship.allShips.push(this);
    }

    setXY(rowName, colName) {
        let left = (colName-1) * this.#squareSize;
        let rowNum = letterToNumber(rowName);
        let top = (rowNum-1) * this.#squareSize;
        this.#x = left;
        this.#y = top;
        this.getElement().style.left = `${this.#x}px`;
        this.getElement().style.top = `${this.#y}px`;
    }

    setStartTile(rowName, colName) {
        this.#rowName = rowName;
        this.#colName = colName;
        this.setXY(rowName, colName);

    }

    renderImgDimensions() {
        if (this.#orientation == "vertical") {
            this.#element.style.width = `${this.#squareSize}px`;
            this.#element.style.height = `${this.#squareSize * this.#tilesLength}px`
        } else {
            this.#element.style.height = `${this.#squareSize}px`;
            this.#element.style.width = `${this.#squareSize * this.#tilesLength}px`
        }
    }

    getOrientation() {
        return this.#orientation;
    }

    getTilesLength() {
        return this.#tilesLength;
    }

    setTiles(tiles) {
        this.#occupiedTiles = tiles;
    }

    getTiles() {
        return this.#occupiedTiles;
    }

    getStatus() {
        return this.#status;
    }

    setStatus(status) {
        this.#status = status;
    }

    getElement() {
        return this.#element;
    }

    getPlayerBoardElement() {
        return this.#playerBoard.getElement();
    }

    static placeAnyPlacing() {
        Ship.allShips.forEach((ship) => {
            if (ship.getStatus() == "placing") {
                ship.setStatus("placed");
                ship.getElement().classList.add("placed");

            }
        })
    }

    setParent(parent) {
        parent.append(this.#element);
    }

    #placingMode() {
        Ship.placeAnyPlacing();
        this.#status = "placing";
        this.#element.classList.add("clicked-ship");
        this.#playerBoard.placeShip(this);
    }

    #unplacedMode() {
        this.#status = "unplaced";
        this.setParent(Ship.shipsSelect);
        this.#element.classList.remove("clicked-ship");
        this.#element.classList.add("unplaced");
    }

    addClickSelect() {
        this.#element.addEventListener("click", () => {
            switch(this.#status) {
                case "unplaced":
                    this.#placingMode();
                    break;
                case "placing":
                    this.#unplacedMode();
                    break;
            }
        })
    }


}