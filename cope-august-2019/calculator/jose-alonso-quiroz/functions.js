const numbers = document.getElementsByName("num");
const operators = document.getElementsByName("operator");
const del = document.getElementById("Backspace");
const execute = document.getElementById("Enter");
const operation = document.getElementById("operation");
const result = document.getElementById('result');
const reset = document.getElementById('Delete');
let temporalTerm = '';
let operatorDeleted = false;

numbers.forEach(number =>
    number.onclick = event => {
        const charcter = event.target.innerHTML.includes('.') && temporalTerm.includes('.') ? '' : event.target.innerHTML;
        temporalTerm = temporalTerm.concat(charcter);
        operation.innerHTML = operation.innerHTML.concat(charcter);
    }
);

del.onclick = event => {
    sliceNum = temporalTerm === '' ? -3 : -1;
    operation.innerHTML = operation.innerHTML.slice(0, sliceNum);
    operatorDeleted = sliceNum === -3 && operation.innerHTML.trim() !== '' ? true : false;
    temporalTerm = temporalTerm.slice(0, sliceNum);
}

operators.forEach(operator =>
    operator.onclick = event => {
        if (result.innerHTML !== 0 && temporalTerm === '') {
            operation.innerHTML = result.innerHTML.concat(' ' + event.target.innerHTML + ' ');
            result.innerHTML = 0;
        }
        operation.innerHTML = temporalTerm === '' && operatorDeleted === false ? operation.innerHTML : operation.innerHTML.concat(' ' + event.target.innerHTML + ' ');
        temporalTerm = '';
        operatorDeleted = false;
    }
);

execute.onclick = event => {
    temporalTerm = '';
    let realOperation = operation.innerHTML.replace(/ /g, '');
    realOperation = realOperation.replace(/÷/g, '/');
    realOperation = realOperation.replace(/x/g, '*');
    realOperation = realOperation.trim();
    result.innerHTML = eval(realOperation);
}

reset.onclick = event => {
    temporalTerm = '';
    operation.innerHTML = '';
    operatorDeleted = false;
    result.innerHTML = 0;
}

document.onkeyup = e => {
    const key = document.getElementById(e.key);
    key && key.click();
}