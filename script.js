let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
let currentPosition='0';

let greenPawns = [];

let redPawns = [];

let area = [
    [1, 2, 3, 4],
    [1, 2, 3, 4],
    [1, 2, 3, 4],
    [1, 2, 3, 4],
    [1, 2, 3, 4],
    [1, 2, 3, 4],
    [1, 2, 3, 4],
    [1, 2, 3, 4]
];

class pawn {
    constructor(id, color, queen) {
        this.id = id;
        this.color = color;
        this.queen = queen;
    }
}

function randPosition() {
    let numeric = Math.floor(Math.random() * 8) + 1;
    let letter, i;


    if (numeric % 2 === 0) { //dla parzystych -> litera nieparzysta
        i = 0;
        while (i % 2 === 0) {
            i = Math.floor(Math.random() * 8);
        }
    } else { //dla nieparzystych -> litera parzysta
        i = 1;
        while (i % 2 !== 0) {
            i = Math.floor(Math.random() * 8);
        }
    }

    letter = letters[parseInt(i)];

    console.log("Spawn position:\n\tletter=" + letter + "; numeric=" + numeric);

    return numeric.toString() + letter;
}

function spawnPawn() {
    currentPosition=randPosition();
    document.getElementById(currentPosition).classList.add("greenDot");
}

function clearBoard() {
    let tmp, j = 0;

    for (let i = 1; i <= 8; i++) {

        let j = (i % 2 === 0) ? 1 : 0;

        for (j; j < 8; j += 2) {

            //setting element
            tmp = (i).toString() + letters[j];

            //removing element
            document.getElementById(tmp).classList.remove("greenDot");

            console.log("cleared position: "+tmp);
        }
    }
}

function startButtonClick() {
    let button=document.getElementById("start_btn");

    console.clear();

    if (button.textContent==='Start'){
        spawnPawn();
        button.innerHTML="Reset";
        button.style.backgroundColor="rgba(115,0,255,0.27)";
    } else {
        clearBoard();
        button.innerHTML="Start";
        button.style.backgroundColor="rgba(255, 0, 0, 0.27)";
    }

    //na klikniecie bedzie wyswietlac sie alert
    document.getElementById(currentPosition).addEventListener("click",function () {
        alert("sioema");
    });
}


function a() {
    let z = document.getElementById("1" + "a");
    z.classList.remove("greenDot");
}