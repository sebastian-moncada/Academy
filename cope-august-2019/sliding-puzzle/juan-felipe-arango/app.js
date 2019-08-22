class Puzzle {
    constructor(name) {
        this.name = name
        this.positions = [
            [1,2,3,4],
            [5,6,7,8],
            [9,10,11,12],
            [13,14,15,0]
        ]
    }

    shuffle() {
        Array.from(document.querySelector('#puzzle').children).forEach(el => {
            el.addEventListener('click', this.move.bind(this), false)
            const randomRow = Math.floor(Math.random()*(4))
            const randomColumn = Math.floor(Math.random()*(4))
            this.swap(el, randomRow, randomColumn)
        })
    }
    swap(element, targetRow, targetColumn) {
        // update positions array
        const tempPosition = this.positions[element.dataset.row][element.dataset.column]
        this.positions[element.dataset.row][element.dataset.column] = this.positions[targetRow][targetColumn]
        this.positions[targetRow][targetColumn] = tempPosition
        
        //update dom
        const tempContent = document.querySelector(`[data-row="${targetRow}"][data-column="${targetColumn}"]`).textContent
        document.querySelector(`[data-row="${targetRow}"][data-column="${targetColumn}"]`).textContent = element.textContent
        element.textContent = tempContent
    }

    move(event){
        const row = event.target.dataset.row
        const column = event.target.dataset.column
        const emptyBlock = this.checkMove(row, column)
        if (emptyBlock) {
            this.swap(event.target, emptyBlock[0], emptyBlock[1])
        }

    }
    checkMove(row, column) {
        if (column<3) {
            if (this.getBoxValue(row, Number(column)+1) == '') {
                return [row, Number(column)+1] 
            }
        }
        if (column>=1) {
            if (this.getBoxValue(row, Number(column)-1) == '') {
                return [row, Number(column)-1] 
            }
        }
        if (row<3) {
            if (this.getBoxValue(Number(row)+1, column) == '') {
                return [Number(row)+1, column] 
            }
        }
        if (row>=1) {
            if (this.getBoxValue(Number(row)-1, column) == '') {
                return [Number(row)-1, column] 
            }
        }
        return false

    }
    getBoxValue(row, column) {
        return document.querySelector(`[data-row="${row}"][data-column="${column}"]`).textContent
    }

}

const puzzle = new Puzzle('my puzzle')
puzzle.shuffle()