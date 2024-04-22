export class Tile {
    #sideLen;
    #parentElem;
    #x;
    #y;
    #element

    constructor(sideLen, parentElem, x, y) {
        this.#sideLen = sideLen;
        this.#parentElem = parentElem;
        this.#x = x;
        this.#y = y;

        this.#element = document.createElement("div");
        this.#element.classList.add("tile");
        this.#element.style.width = `${this.#sideLen}px`;
        this.#element.style.height = `${this.#sideLen}px`;
        this.#element.style.left = `${this.#x}px`;
        this.#element.style.top = `${this.#y}px`;

        this.#parentElem.append(this.#element);

    }
    
}

