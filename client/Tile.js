export class Tile {
    #sideLen;
    #parentElem;
    #x;
    #y;
    #element;
    #type;


    constructor(sideLen, parentElem, x, y, type) {
        this.#sideLen = sideLen;
        this.#parentElem = parentElem;
        this.#x = x;
        this.#y = y;
        this.#type = type;

        this.#element = document.createElement("button");
        this.#element.classList.add("tile");
        this.#element.style.width = `${this.#sideLen}px`;
        this.#element.style.height = `${this.#sideLen}px`;
        this.#element.style.left = `${this.#x}px`;
        this.#element.style.top = `${this.#y}px`;
        this.#element.onclick = this.#click.bind(this); // Bind click handler

        this.#parentElem.append(this.#element);

    }

    #click = function() {
        this.#type == "opponent" ? this.#clickOpponentSquare() : this.#clickPlayerSquare();
    }

    #clickOpponentSquare = function() {
        console.log('opp')
    }

    #clickPlayerSquare = function() {
        console.log('pla')
    };
    
}

