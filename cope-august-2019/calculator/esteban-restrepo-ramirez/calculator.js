
//DOM elements
var digitClass 		= document.getElementsByClassName("digit");
var operatorClass 	= document.getElementsByClassName("operator");
var equalButton 	= document.getElementById("equal");
var cleanButton 	= document.getElementById("clean");

var digits 		= [];
var operators 	= [];
var lastButtonTyped = 0; //tis variable is the flag to know if the previous button pressed was a digit (0) or and operator (1)
var math_it_up = {
    "+": function (x, y) { return x + y },
    "-": function (x, y) { return x - y },
	"*": function (x, y) { return x * y },
	"/": function (x, y) { return x / y }
};

//digits click event
Array.from(digitClass).forEach(function(element) {
	element.addEventListener('click', function(){
		var digit = this.textContent;
		
		//if the default value is there, lets clean the screen 
		if(document.getElementById('result').value == 0) document.getElementById('result').value = '';
		
		//set the digit pressed into the screen
		document.getElementById('result').value += digit;
		
		//if the last element pressed was a digit
		if(lastButtonTyped == 0 && digits.length >0 ){
			var lastElement = digits.length-1; 
			digits[lastElement] += digit;
			digits[lastElement] = parseInt(digits[lastElement])
		}else{ //it means the last element pressed was an operator
			digits.push(parseInt(digit));
		}
		lastButtonTyped = 0;
	});
});

//operators click event
Array.from(operatorClass).forEach(function(element) {
	element.addEventListener('click', function(){
		var operator = this.textContent;
		
		//those guys are belong to the operator css class, but dont need to be included in this event logic
		if(operator == "=" || operator == "CE" || lastButtonTyped == 1) return;
		
		/*for those cases where the user for some reason just enter one digit, 
		we need to operate it with the 0 that we have there as default value*/
		if(digits.length == 0){
			digits[0] = 0;
		}
		operators.push(operator);
		document.getElementById('result').value += operator;
		
		lastButtonTyped = 1;
	});
});

//result click event
equalButton.addEventListener('click', function(){
	var result = 0;
	
	
	if(operators.length == 0) return;
	
	operators.forEach(function(op){
		
		//if isn't the first iteration
		if(result != 0){
			result = math_it_up[op](result, digits[0]);
			digits.shift();
		}else{ //otherwise
			if(digits.length < 2) return;
			
			//te function called here will run the right operation according the user input
			result = math_it_up[op](digits[0], digits[1]);
			digits.splice(0,2);
		}
	});
	
	digits		= [];
	operators 	= [];
	document.getElementById('result').value = result;
	digits[0]= parseInt(document.getElementById('result').value);
});

//clean screen click event
cleanButton.addEventListener('click', function(){
	var currentValue = document.getElementById('result').value;
	
	//if there is nothing in these arrays we dont want to delete the defaul 0 from the screen
	if(operators.length == 0 && digits.length == 0) return;
	
	//if the char to delete from screen is a number
	if(!isNaN(currentValue[currentValue.length-1])){
		if(digits[digits.length-1].toString().length > 1) digits[digits.length-1] = parseInt(digits[digits.length-1].toString().slice(0, -1));
		else digits.pop();
	}
	else operators.pop();
	
	var subString = currentValue.slice(0, -1);
	document.getElementById('result').value = subString.length != 0 ? subString : "0";
});