export class Tile {
    #sideLen;
    #parentElem;
    #x;
    #y;
    #element;
    #type;
    #socket;
    #rowName
    #colName;
    #parent;
    #occupied = false



    constructor(sideLen, parentElem, x, y, type, socket, rowName, colName, parent) {
        this.#sideLen = sideLen;
        this.#parentElem = parentElem;
        this.#x = x;
        this.#y = y;
        this.#type = type;
        this.#socket = socket;
        this.#rowName = rowName;
        this.#colName = colName;
        this.#parent = parent;


        this.#element = document.createElement("div");
        this.#element.classList.add("tile");
        this.#element.style.width = `${this.#sideLen}px`;
        this.#element.style.height = `${this.#sideLen}px`;
        this.#element.style.left = `${this.#x}px`;
        this.#element.style.top = `${this.#y}px`;
        this.#element.onclick = this.#click.bind(this); // Bind click handler

        this.#parentElem.append(this.#element);

    }

    getName() {
        return `${this.getRowName()}${this.getColName()}`
    }

    isOccupied() {
        return this.#occupied;
    }

    setOccupied(tf) {
        this.#occupied = tf;
    }

    getElement() {
        return this.#element;
    }


    getRowName() {
        return this.#rowName;
    }

    getColName() {
        return this.#colName;
    }

    #click = function() {
        this.#type == "opponent" ? this.#clickOpponentSquare() : this.#clickPlayerSquare();
    }
    
    #clickOpponentSquare() {
        console.log('opp');
        if (this.#parent.isActive()) {
            this.#socket.emit("fire", this.#rowName, this.#colName);
        }
    }

    #clickPlayerSquare = function() {
        console.log('pla')
    };
    
}

