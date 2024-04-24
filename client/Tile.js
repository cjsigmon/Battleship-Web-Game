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
    #occupied = false;
    #hit = false;
    #alreadyClicked = false;
    #occupyingShip



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

    miss() {
        this.#element.classList.add("miss");
    }

    isHit() {
        return this.#hit;
    }

    hit() {
        this.#hit = true;
        this.#element.classList.add('hit')
    }

    isOccupied() {
        return this.#occupied;
    }

    setOccupied(tf, ship) {
        this.#occupied = tf;
        if (tf) {
            this.#element.classList.add('occupied');
            this.#occupyingShip = ship;
        } else {
            this.#element.classList.remove('occupied');
            this.#occupyingShip = undefined;
        }

    }

    getOccupyingShip() {
        return this.#occupyingShip;
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
        if (this.#parent.isActive() && !this.#alreadyClicked) {
            this.#socket.emit("fire", this.#rowName, this.#colName);
            this.#alreadyClicked = true;
        }
    }

    #clickPlayerSquare = function() {
    };
    
}

