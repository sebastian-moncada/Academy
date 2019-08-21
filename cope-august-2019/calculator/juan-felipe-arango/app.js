var keys = document.querySelectorAll('.operation')
var number1 = document.getElementById('number1')
var number2 = document.getElementById('number2')
var result = document.getElementById('result')

keys.forEach(el => {
    el.addEventListener('click', () => {
        if (number1 && number2) {
            result.textContent = `the result is: ${eval(number1.value + el.dataset.value + number2.value)}`
        } else {
            result.textContent = 'You hace to type 2 values'
        }
    })
})
