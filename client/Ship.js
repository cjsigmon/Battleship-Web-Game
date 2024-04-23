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

    renderImgDimensions() {
        if (this.#orientation == "vertical") {
            this.#element.style.width = `${this.#squareSize}px`;
            this.#element.style.he = `${this.#squareSize * this.#tilesLength}px`
        } else {
            this.#element.style.height = `${this.#squareSize}px`;
            this.#element.style.width = `${this.#squareSize * this.#tilesLength}px`
        }
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

    placeAnyPlacing() {
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

    addClickSelect() {
        this.#element.addEventListener("click", () => {
            switch(this.#status) {
                case "unplaced":
                    this.placeAnyPlacing();
                    this.#status = "placing";
                    this.setParent(this.#playerBoard.getElement());
                    this.#element.classList.add("clicked-ship")
                    
                    break;
                case "placing":
                    this.#status = "unplaced";
                    this.setParent(Ship.shipsSelect);
                    this.#element.classList.remove("clicked-ship");
                    this.#element.classList.add("unplaced");
                    break;
            }
        })
    }


}