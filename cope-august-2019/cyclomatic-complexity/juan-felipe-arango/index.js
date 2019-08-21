
// Kata A
// complexity: 2
function predictAge(age1,age2,age3,age4,age5,age6,age7,age8){
    let result = 0;
    for (let i = 0; i < arguments.length; i++) {
        result += arguments[i]*arguments[i];
    }
    return Math.floor(Math.sqrt(result)/2);
}

// KATA B
// complexity: 3
function unluckyDays(year){
    let counter = 0
    for (let i=0; i < 12; i++) {
      let date = new Date(year, i, 13)
      if (date.getDay() === 5) {
        counter++
      }
    }
    
    return counter
}
