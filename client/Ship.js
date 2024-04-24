import { nextCharacter, prevCharacter } from "./utils"
import { letterToNumber } from "./utils"
let placeShipBtn = document.getElementById("placeShipBtn");


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
    #hits = 0;
    #sunk = false;

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
        // this.makeMovable = this.makeMovable.bind(this);
        // this.makeImmovable = this.makeImmovable.bind(this);
        this.evalKeyDownBound = this.evalKeyDown.bind(this);



        Ship.allShips.push(this);
    }

    receiveHit() {
        if (this.#occupiedTiles.every((tile) => tile.isHit())) {
            this.#sunk = true;
        }
    }

    isSunk() {return this.#sunk}

    getWidth() {
        if (this.#orientation == "vertical") {
            this.#width =this.#squareSize;
        } else {
            this.#width = this.#squareSize * this.#tilesLength;
        }
        return this.#width;
    }

    getHeight() {
        if (this.#orientation == "vertical") {
            this.#height = this.#squareSize * this.#tilesLength;
        } else {
            this.#height = this.#squareSize;
        }
        return this.#height;
    }

    getRowName() {
        return this.#rowName;
    }
    getColName() {
        return this.#colName;
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

    getStartTileName() {
        return `${this.#rowName}${this.#colName}`;
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

    placeOnPlayerBoard() {
        this.#playerBoard.placeShip(this);
        this.#placedMode();
    }

    static placeAnyPlacing() {
        Ship.allShips.forEach((ship) => {
            if (ship.getStatus() == "placing") {
                ship.setStatus("placed");
                ship.getElement().classList.add("placed");
                ship.placeOnPlayerBoard();
                

            }
        })
    }

    setParent(parent) {
        parent.append(this.#element);
    }

    // 
    // left = 37
    // up = 38
    // right = 39
    // down = 40

    makeMovable() {
        document.addEventListener('keydown', this.evalKeyDownBound);
    }

    makeImmovable() {
        document.removeEventListener('keydown', this.evalKeyDownBound);
    }



    evalKeyDown(e) {
        switch(e.code) {
            case "ArrowLeft":
                this.tryMoveDirection('l');
                break;
            case "ArrowRight":
                this.tryMoveDirection('r');
                break;
            case "ArrowDown":
                this.tryMoveDirection('d');
                break;
            case "ArrowUp":
                this.tryMoveDirection('u');
                break;
            
        }
        // You might want to perform some actions here based on the keypress
    }


    tryMoveDirection(direction) {
        switch(direction) {
            case 'l':
                if (this.#x > 0) {
                    this.setStartTile(this.#rowName, this.#colName-1);
                }
                break;
            case 'r':
                if ((this.#x + this.getWidth()) < this.#playerBoard.getWidth())  {
                    this.setStartTile(this.#rowName, this.#colName+1);
                }
                break;
            case 'd':
                if ((this.#y + this.getHeight()) < this.#playerBoard.getHeight()) {

                    this.setStartTile(nextCharacter(this.#rowName), this.#colName);
                }
                break;
            case 'u':
                if (this.#y > 0) {
                    this.setStartTile(prevCharacter(this.#rowName), this.#colName);
                }
                break;

        }
    }


    getPotentialTiles() {
        let result = this.#playerBoard.getRowCells(this.#rowName, this.#colName, this.#tilesLength);
        return result;
    }

    isNotOverlapping() {
        return this.getPotentialTiles().every((tile) => {
            return !tile.isOccupied();
        })
    }


    #placedMode() {
        this.#status = "placed";
        this.#element.classList.remove("clicked-ship");
        this.#element.classList.add("placed");
        this.makeImmovable();
        placeShipBtn.style.display = 'none';
    }

    #placingMode() {
        Ship.placeAnyPlacing();
        this.#status = "placing";
        this.#element.classList.add("clicked-ship");
        placeShipBtn.style.display = 'block';

        this.#playerBoard.projectShip(this);
        this.makeMovable();
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

placeShipBtn.addEventListener("click", Ship.placeAnyPlacing)