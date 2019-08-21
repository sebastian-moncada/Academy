function cellClick(x, y) {
    var clickedCont = document.getElementById("cont" + (x) + (y))
    var elements = [
        document.getElementById("cont" + (x) + (y - 1)),
        document.getElementById("cont" + (x + 1) + (y)),
        document.getElementById("cont" + (x - 1) + (y)),
        document.getElementById("cont" + (x) + (y + 1))
    ];

    containers = elements.filter(element => element != null);

    if (clickedCont.getElementsByClassName("cell")[0].id != "cellxx") {
        for (container of containers) {
            if (validate(container)) {
                swapCells(container, clickedCont);
                break;
            }
        }
    }
}

let validate = (cell) => {
    var cellElement = cell.getElementsByClassName("cell")[0];
    if (cellElement.id == "cellxx") {
        return true;
    } else {
        return false;
    }
}

function swapCells(containerEmpty, contanierValue) {
    var temp = contanierValue.getElementsByClassName("cell")[0];
    contanierValue.appendChild(document.getElementById('cellxx'));
    containerEmpty.appendChild(temp);
}