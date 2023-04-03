let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

let currentPosition = '0'; //specifies current position

let abortController; //will help to remove event listeners

function randPosition() {
    let numeric = Math.floor(Math.random() * 8) + 1; //from 1 to 8
    let letter, i;


    if (numeric % 2 === 0) { //even number -> odd number of index in the 'letters' array
        i = 0;
        while (i % 2 === 0) {
            i = Math.floor(Math.random() * 8); //generates index from 0 to 7 until it will be the odd number
        }
    } else { //odd number -> even number of index in the 'letters' array
        i = 1;
        while (i % 2 !== 0) {
            i = Math.floor(Math.random() * 8); //generates index from 0 to 7 until it will be the even number
        }
    }

    letter = letters[parseInt(i)];

    console.log("Rand position:\n\tletter=" + letter + "; numeric=" + numeric);

    return numeric.toString() + letter;
}

function spawnPawn() { //spawns pawn in a random place
    currentPosition = randPosition();
    document.getElementById(currentPosition).classList.add("greenDot");
    console.log("pawn spawned");
}

function clearBoard() { //clears the board
    let tmp, j = 0;

    for (let i = 1; i <= 8; i++) {

        j = (i % 2 === 0) ? 1 : 0; //if j=odd number -> the "letter" index will start from "1", so it's 'b' letter

        for (j; j < 8; j += 2) { //j is increased by "2" because of the gaps between white squares

            tmp = (i).toString() + letters[j]; //tmp is the name of the element

            document.getElementById(tmp).classList.remove("greenDot"); //removing element on position specified by "tmp"

            highlightOff(tmp);

            console.log("cleared position: " + tmp);
        }
    }
}

function loop() { //adds onclick to spawned pawn
    abortController = new AbortController();
    document.getElementById(currentPosition).addEventListener("click", pawnClick, {signal: abortController.signal});
}

function startButtonClick() {
    let button = document.getElementById("start_btn");

    console.clear();

    if (button.textContent === 'Start') {
        spawnPawn();
        button.innerHTML = "Reset";
        button.style.backgroundColor = "rgba(115,0,255,0.27)";
        loop();
    } else { //the clicked button in this case will be used as a Reset button
        clearBoard();
        currentPosition = '0';
        abortController.abort();
        button.innerHTML = "Start";
        button.style.backgroundColor = "rgba(255, 0, 0, 0.27)";
    }
}

function pawnClick() {
    console.log("pawn is clicked");
    let allowedPositions = calculatePosition();

    for (const element of allowedPositions) {
        highlightOn(element); //turning on the highlight of the specific square

        document.getElementById(element).addEventListener("click", function () {
            movePawn(element, allowedPositions, abortController);
        }, {signal: abortController.signal});
    }

}

function calculatePosition() { //calculates the position to which can pawn be moved
    let positions = [];
    let number = parseInt(currentPosition[0]); //it's a numeric coordinate of current position
    let letter = letters.findIndex(x => x === currentPosition[1]); //it's a letter coordinate of current position
    let buffer; //holds the name of the position

    console.log("current number:" + number + ", letter:" + letter);

    buffer = (number - 1).toString() + letters[letter - 1];

    if (!buffer.includes('undefined') && buffer[0] <= 8 && buffer[0] > 0) { //filtering if the "square" is on our board
        positions.push(buffer)
    }

    buffer = (number - 1).toString() + letters[letter + 1];

    if (!buffer.includes('undefined') && buffer[0] <= 8 && buffer[0] > 0) {
        positions.push(buffer)
    }

    buffer = (number + 1).toString() + letters[letter - 1];

    if (!buffer.includes('undefined') && buffer[0] <= 8 && buffer[0] > 0) {
        positions.push(buffer)
    }

    buffer = (number + 1).toString() + letters[letter + 1];

    if (!buffer.includes('undefined') && buffer[0] <= 8 && buffer[0] > 0) {
        positions.push(buffer)
    }

    console.log(positions);

    return positions;
}

function highlightOn(position) { //turns on the highlight of the element
    document.getElementById(position).parentElement.style.border = "5px solid rgba(215,82,82,0.89)";
    console.log("highlighted position=" + position);
}

function highlightOff(position) { //turns off the highlight of the element
    document.getElementById(position).parentElement.style.border = "0";
    console.log("highlight turned off");
}

function movePawn(position, allowedPositions, abortController) { //moves pawn on the board
    console.log("clicked square to move pawn");

    document.getElementById(currentPosition).classList.remove("greenDot"); //"old" pawn is removed
    console.log("removed pawn");

    document.getElementById(position).classList.add("greenDot"); //"new" pawn is placed
    console.log("placed pawn");

    for (const element of allowedPositions) { //disabling functions for the rest of the positions
        highlightOff(element);
        abortController.abort();
        console.log("removed event listener from " + element);
    }

    currentPosition = position; //changing current position
    loop(); //this will loop the program
}