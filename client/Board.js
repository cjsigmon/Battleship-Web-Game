import { Tile } from "./Tile";

export class Board {
    #sideLen;
    #parentElem;
    #element
    #boardType // player opponent
    #tilesPerSide
    #tileSize

    constructor(sideLen, parentElem, boardType, tilesPerSide, tileSize) {
        this.#sideLen = sideLen;
        this.#parentElem = parentElem;
        this.#boardType = boardType;
        this.#tilesPerSide = tilesPerSide;
        this.#tileSize = tileSize;

        this.#element = document.createElement("div");
        this.#element.classList.add("board");
        this.#element.style.width = `${this.#sideLen}px`;
        this.#element.style.height = `${this.#sideLen}px`;

        this.#fillTiles();

        this.#parentElem.append(this.#element);

    }

    getElement() {
        return this.#element;
    }

    #fillTiles() {
        for (let rows = 0; rows < this.#tilesPerSide; rows++) {
            for (let cols = 0; cols < this.#tilesPerSide; cols++) {
                const x = this.#tileSize * cols;
                const y = this.#tileSize * rows;
                new Tile(this.#tileSize, this.#element, x, y, this.#boardType);
            }
        }
    }
 

    
}

