//complex 2
function predictAge(...ages) {
    let result = ages.reduce((total, age) => total + age * age, 0);
    result = Math.sqrt(result);
    return Math.floor(result / 2);
}

//complex 2
function unluckyDays(year) {
    return [...Array(12).keys()].reduce((total, month) => {
        const date = new Date(year.toString(10), month, 13);
        const unluckyDay = parseInt(date.getDay()) === 5 ? 1 : 0;
        return total + unluckyDay;
    }, 0)
}

//complex 4
function* paperFold() {
    let last = 0;
    let temp = 1;
    for (let sw = true; true; sw = true) {
        temp = temp.toString().split('').reduce(
            (term, bin) => {
                sw = !sw;
                return term + bin + (sw ? 1 : 0);
            }, '1'
        );
        let term = temp.substring(last).toString().split('');
        for (let index = 0; index < term.length; index++) {
            yield parseInt(term[index]);
        }
        last = temp.length;
    }
}