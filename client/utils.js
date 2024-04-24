export function displayText(text) {
    const elem = document.getElementById("displayText");
    const textElem = document.createElement("p");
    textElem.innerText = text;
    elem.append(textElem);
}

export function nextCharacter(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
}

export function letterToNumber(letter) {
    letter = letter.toUpperCase();
    return letter.charCodeAt(0) - 64;
}

export function addChild(child, parent) {
    parent.append(child);
}
