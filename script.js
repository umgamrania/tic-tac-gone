const all_boxes = document.querySelectorAll(".game .box")
const free_boxes = Array.from(all_boxes)

const winBar = document.querySelector(".win-bar")
const topDiv = document.querySelector(".top")
const turnIndicator = document.querySelector(".top .box > div")

const CROSS = document.createElement("div")
CROSS.className = "cross"

const CIRCLE = document.createElement("div")
CIRCLE.className = "circle"

const crosses = []
const circles = []

let currentElement = CROSS
let gameOver = false

let flashing
function flash(element) {
    if(flashing){
        flashing.classList.remove("flash")
    }

    flashing = element
    flashing.classList.add("flash")
}

free_boxes.forEach(box => {
    box.onclick = () => {
        if(!gameOver){
            let index = free_boxes.indexOf(box)
            if(index > -1){
                fill(box)
                free_boxes.splice(index, 1)
            }
            if(free_boxes.length == 0 && !gameOver){
                gameOver = true
                topDiv.innerHTML = "<h1>It's a tie!</h1>"
            }
            console.log(crosses.length, circles.length);
        }
    }
})

function fill(element) {
    if(currentElement == CROSS) {
        crosses.push(element)
        element.appendChild(currentElement.cloneNode(false))
        currentElement = CIRCLE
        if(crosses.length > 3){
            crosses[0].removeChild(crosses[0].firstChild)
            free_boxes.push(crosses[0])
            crosses.splice(0, 1)
        }
        if(circles.length == 3) {
            flash(circles[0].firstChild)
        }
    }
    else if(currentElement == CIRCLE) {
        circles.push(element)
        element.appendChild(currentElement.cloneNode(false))
        currentElement = CROSS
        if(circles.length > 3){
            console.log("Inside if");
            circles[0].removeChild(circles[0].firstChild)
            free_boxes.push(circles[0])
            circles.splice(0, 1)
        }
        if(crosses.length == 3) {
            flash(crosses[0].firstChild)
        }
    }

    turnIndicator.className = currentElement.className

    let win = checkWinner()

    if(win) {
        gameOver = true

        if(flashing)
            flashing.classList.remove("flash")
        
        winBar.classList.add(`win-${win.winner}`)
        winBar.className += " " + win.combination

        winBar.animate({
            transform: "scaleY(1)"
        }, {duration: 1000, easing: "ease", fill: "forwards"})

        topDiv.innerHTML = `<div class="box"><div class="${win.winner}"></div></div><h1>Won</h1>`
    }
}

function checkWinner() {
    const win = {
        "row row-1": [0, 1, 2],
        "row row-2": [3, 4, 5],
        "row row-3": [6, 7, 8],
        "col col-1": [0, 3, 6],
        "col col-2": [1, 4, 7],
        "col col-3": [2, 5, 8],
        "diagonal main-diag": [0, 4, 8],
        "diagonal second-diag": [2, 4, 6]
    }

    for (const condition of Object.values(win)) {
        const [a, b, c] = condition;
        const aBox = all_boxes[a];
        const bBox = all_boxes[b];
        const cBox = all_boxes[c];

        // Check if boxes have same symbol and are filled
        if (aBox.firstChild && bBox.firstChild && cBox.firstChild &&
            aBox.firstChild.className === bBox.firstChild.className &&
            bBox.firstChild.className === cBox.firstChild.className) {
            // Return the winner's symbol and the winning combination
            return {
                winner: aBox.firstChild.className,
                combination: getKeyByValue(win, condition)
            };
        }
    }

    // If no winner found
    return null;
}

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}  