/**
 * INITIALIZE board and minimum configurations
 */

let rowbox = 3; //This must be more than 4, 9, 16, 25
const s = new Set()
let main = document.getElementById('container-main')
let unique = Math.ceil(Math.random() * (rowbox * rowbox))
for (let index = 0; index < (rowbox * rowbox); index++) {
    // Create unique numbers, or no repeat numbers in set collection
    while (s.has(unique)) {
        unique = Math.ceil(Math.random() * (rowbox * rowbox))
    }
    s.add(unique)

    // Create input element
    var input = document.createElement("span")
    //input.type = "text"
    input.className = "cell"
    input.id = "cell" + index
    input.value = ( ( rowbox * rowbox ) === unique ) ? '' : unique // This is no repeat number
    input.textContent = ( ( rowbox * rowbox ) === unique ) ? '' : unique // This is no repeat number
    //input.disabled = true
    main.append(input)
}

// Set style on board
var styleCell = document.createElement('style');
styleCell.innerHTML = '.cell { width: ' + ((100 / rowbox) - 1) + '%; }'
document.head.appendChild(styleCell);


// Adding functions behavior when click
const changeValue = ( point, newpoint, value ) => {
    document.getElementById('cell' + newpoint).textContent = value
    document.getElementById('cell' + newpoint).value = value
    document.getElementById('cell' + point).textContent = ''
    document.getElementById('cell' + point).value = ''
}

const moveCell = ( event ) => {
    if ( event.target.value != "" ) { // Check up, down, left, right if is empty
        let cellId = parseInt(event.target.id.substring(4))

        // Check LEFT SIDE
        // No left data on left border, so dont check left side. Verify if exist data on left, and verify is empty
        if ( cellId % rowbox != 0 && 
            document.getElementById('cell' + (cellId - 1)) && 
            document.getElementById('cell' + (cellId - 1)).value == '' ) {
            changeValue(cellId, cellId - 1, document.getElementById('cell' + cellId).value)
        }
        // Check RIGHT SIDE
        // No right data on left border, so dont check left side. Verify if exist data on right, and verify is empty
        if ( ( parseInt(cellId) + 1 ) % rowbox != 0 && 
            document.getElementById('cell' + (cellId + 1)) && 
            document.getElementById('cell' + (cellId + 1)).value == '' ) {
            changeValue(cellId, cellId + 1, document.getElementById('cell' + cellId).value)
        }
        // Check UP SIDE
        // No up data on first row, so dont check up side. Verify if exist data on up, and verify is empty
        if ( (cellId - rowbox > 0) && 
            document.getElementById('cell' + (cellId - rowbox)) && 
            document.getElementById('cell' + (cellId - rowbox)).value == '' ) {
            changeValue(cellId, cellId - rowbox, document.getElementById('cell' + cellId).value)
        }
        // Check DOWN SIDE
        // No down data on last row, so dont check down side. Verify if exist data on down, and verify is empty
        if ( ((cellId + rowbox) < (rowbox * rowbox)) && 
            document.getElementById('cell' + (cellId + rowbox)) && 
            document.getElementById('cell' + (cellId + rowbox)).value == '' ) {
            changeValue(cellId, cellId + rowbox, document.getElementById('cell' + cellId).value)
        }
    }
}

// Adding behavior when click
main.addEventListener("click", moveCell);