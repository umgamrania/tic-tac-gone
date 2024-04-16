const all_boxes = document.querySelectorAll(".box")
const free_boxes = Array.from(all_boxes)

const CROSS = document.createElement("div")
CROSS.className = "cross"

const CIRCLE = document.createElement("div")
CIRCLE.className = "circle"

let currentElement = CROSS

const crosses = []
const circles = []

free_boxes.forEach(box => {
    box.onclick = () => {
        let index = free_boxes.indexOf(box)
        if(index > -1){
            fill(box)
            free_boxes.splice(index, 1)
        }
    }
})

function fill(element) {
    if(currentElement == CROSS) {
        crosses.push(element)
        element.appendChild(currentElement.cloneNode(false))
        currentElement = CIRCLE
    }
    else if(currentElement == CIRCLE) {
        circles.push(element)
        element.appendChild(currentElement.cloneNode(false))
        currentElement = CROSS
    }

}

function findWinner() {
    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const condition of winningConditions) {
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
                combination: condition
            };
        }
    }

    // If no winner found
    return null;
}
