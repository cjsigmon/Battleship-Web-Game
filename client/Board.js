import { Tile } from "./Tile";
import { addChild } from "./utils";

export class Board {
    #sideLen;
    #parentElem;
    #element
    #boardType 
    // player opponent
    #tilesPerSide
    #tileSize
    #socket
    #active
    #allTiles = []
    #placedShips = []


    constructor(sideLen, parentElem, boardType, tilesPerSide, tileSize, socket) {
        this.#sideLen = sideLen;
        this.#parentElem = parentElem;
        this.#boardType = boardType;
        this.#tilesPerSide = tilesPerSide;
        this.#tileSize = tileSize;
        this.#socket = socket;
        this.#active = false;

        this.#element = document.createElement("div");
        this.#element.classList.add("board");
        this.#element.style.width = `${this.#sideLen}px`;
        this.#element.style.height = `${this.#sideLen}px`;

        this.#fillTiles();

        this.#parentElem.append(this.#element);

        this.makeActive = this.makeActive.bind(this);
        this.makeInactive = this.makeInactive.bind(this);
        this.#socket.on("make-active", this.makeActive);
        this.#socket.on("make-inactive", this.makeInactive);


    }

    isActive() {
        return this.#active;
    }


    placeShip(ship) {
        // for cell occupied run method
        if (ship.getOrientation() == "horizantal") {
            const emptyRowStart = this.findEmptyRowStart(ship.getTilesLength());
            const cellsToOccupy = this.getRowCells(emptyRowStart.rowName, emptyRowStart.colName, ship.getTilesLength());

            ship.setStartTile(emptyRowStart.rowName, emptyRowStart.colName);


        }

        addChild(ship.getElement(), this.getElement());
        this.occupyTiles(ship.getTiles());
    }

    getRowCells(startRowName, startColName, length) {
        let row = this.getArrayOfRows().find((r) => {
            return r[0].getRowName() == startRowName;
        })
        let startIndex = row.findIndex((cell) => {
            return cell.getColName() == startColName;
        });
        return row.slice(startIndex, (startIndex+length))
    }

    getArrayOfCols() {
        let result = [];
        let colName = 1;
        for (let i = 0; i < this.#tilesPerSide; i++) {
            let col = this.#allTiles.filter((tile) => {
                return tile.getColName() == colName;
            });
            let nameCopy = [];
            col.forEach((cell) => nameCopy.push(cell.getName()))
            // result.push(col);
            result.push(nameCopy);
            colName++;
        }
        console.log(result);
        return result;
    }

    getArrayOfRows() {
        let result = [];
        let rowName = 'a';
        for (let i = 0; i < this.#tilesPerSide; i++) {
            let row = this.#allTiles.filter((tile) => {
                return tile.getRowName() == rowName;
            })
            result.push(row);
            rowName = nextCharacter(rowName);
        }
        console.log(result);
        return result;
    }

    findEmptyRowStart(consecutiveTilesToFind) {
        let currentRow = 'a';
        let currenCol = 1;
        this.getArrayOfRows().forEach((row) => {
            let foundLength = 0;
            for (let i = 0; i < row.length; i++) {
                if (!row[i].isOccupied()) {
                    foundLength++;
                    if (foundLength == consecutiveTilesToFind) {
                        currentRow = row[i].getRowName();
                        currenCol = i - (consecutiveTilesToFind-1);
                        return {
                            rowName: currentRow,
                            colName: currenCol
                        };
                    }
                } else {
                    foundLength = 0;
                }
            }
        })
        
        return {
            rowName: currentRow,
            colName: currenCol
        };
    }

    occupyTiles(tiles) {
        tiles.forEach((tile) => {
            tile.setOccupied(true);
        })
    }

    deOccupyTiles(tiles) {
        tiles.forEach((tile) => {
            tile.setOccupied(false);
        })
    }



    makeActive() {
        if (this.#boardType == "opponent") {
            this.#active = true;
            this.#element.classList.add("active")
        }

    }

    makeInactive() {
        this.#active = false;
        this.#element.classList.remove("active")
    }

   



    getElement() {
        return this.#element;
    }

    evaluateFire(rowName, colName) {
        const tile = this.getTile(rowName, colName);
        console.log("row and col: ", rowName, colName)
        tile.getElement().classList.add("hit");

        // if valid move
        
    }


    getTile(rowName, colName) {
        return this.#allTiles.find((tile) => tile.getRowName() == rowName && tile.getColName() == colName);
    }

    #fillTiles() {
        let rowName = 'a';
        for (let rows = 0; rows < this.#tilesPerSide; rows++) {
            for (let cols = 0; cols < this.#tilesPerSide; cols++) {
                const x = this.#tileSize * cols;
                const y = this.#tileSize * rows;
                this.#allTiles.push(new Tile(this.#tileSize, this.#element, x, y, this.#boardType, this.#socket, rowName, (cols+1), this))
            }
            rowName = nextCharacter(rowName);
        }
    }
 

    
}

function nextCharacter(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
}

