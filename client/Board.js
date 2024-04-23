import { Tile } from "./Tile";

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

