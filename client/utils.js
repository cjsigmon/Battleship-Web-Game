export function displayText(text) {
    const elem = document.getElementById("displayText");
    const textElem = document.createElement("p");
    textElem.innerText = text;
    elem.append(textElem);
}

export function nextCharacter(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
}

export function prevCharacter(c) {
    return String.fromCharCode(c.charCodeAt(0) - 1);
}

export function letterToNumber(letter) {
    letter = letter.toUpperCase();
    return letter.charCodeAt(0) - 64;
}

export function addChild(child, parent) {
    parent.append(child);
}

const scoreTable = document.getElementById("hiScores");
export function showHighScores(rows) {
    rows = rows.slice(0,10);
    rows.forEach((r) => {
        const newRow = document.createElement('tr');
        const initialsCell = document.createElement('td');
        const scoreCell = document.createElement('td');
        initialsCell.innerText = r.initials;
        scoreCell.innerText = r.score;
        addChild(initialsCell, newRow);
        addChild(scoreCell, newRow);

        addChild(newRow, scoreTable)
    })

}
