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
export async function showHighScores() {
    await getData()
    .then(async (scores) => {
        scores = scores.slice(0, 10);
        scores.forEach((s) => {
            const newRow = document.createElement('tr');
            const initialsCell = document.createElement('td');
            const scoreCell = document.createElement('td');
            initialsCell.innerText = s.initials;
            scoreCell.innerText = s.score;
            addChild(initialsCell, newRow);
            addChild(scoreCell, newRow);
    
            addChild(newRow, scoreTable)
        });
        

        
    });
}

export async function postScore(initials, score) {
    const body = {
        initials: initials,
        score: score
    };
    alert('posting')

    await postData("http://localhost:7777/scores", body)
    .then(async (data) => {
        console.log(data);
        
    })
    .catch((error) => {
        console.error("Error:", error);
    });

}

export async function getData() {
    const response = await fetch("http://localhost:7777/scores");
    return response.json();
}

export async function postData(url = "", data = {}) {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    return response.json();
}

const initialsBtn = document.getElementById("submitInitials");
const winModal = document.getElementById("winModal");

export async function winScreen() {
    winModal.style.display = 'flex';
    initialsBtn.onclick = getInitials;
}

const getInitials = function() {
    const initials = document.getElementById("initials");
    if (initials.value.length === 3) {
        postScore(initials.value, getGlobalScore()).then(() => {
            showHighScores();
            winModal.style.display = 'none';
            setGlobalScore(0);
        })
    }
};

let globalScore = 0;
export function getGlobalScore() {
    return globalScore;
}

export function setGlobalScore(amount) {
    globalScore = amount;
}

const helperTxt = document.getElementById("helperTxt");
export function setHelper(...strings) {
    helperTxt.innerHTML = '';
    strings.forEach((s) => {
        helperTxt.innerHTML += s;
        helperTxt.innerHTML += '<br>';
    });
}

const aboveHelperTxt = document.getElementById("aboveHelperTxt");
export function setAlert(...strings) {
    aboveHelperTxt.innerHTML = '';
    strings.forEach((s) => {
        aboveHelperTxt.innerHTML += s;
        aboveHelperTxt.innerHTML += '<br>';
    });
}




  

  