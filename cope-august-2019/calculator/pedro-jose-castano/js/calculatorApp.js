var calculatorApp = {
    config : {
        container : '#calculator',
        display : '#inputCalculator',
        digits : '.digit',
        operators : '.operator',
        resolve: '.resolve'

    },
    init : function() {
        var digitsAndOperators = document.querySelectorAll(`${calculatorApp.config.digits}, ${calculatorApp.config.operators}`, calculatorApp.config.container);
        for (let element of digitsAndOperators) {
            element.addEventListener("click",function(e){
                calculatorApp.display(this.value);
            },false);
        }
        var resolveButton = document.querySelector(calculatorApp.config.resolve, calculatorApp.config.container);
        resolveButton.addEventListener("click",function(e){
            calculatorApp.resolve();
        },false);

    },
    display : function(value) {
        let input = document.querySelector(calculatorApp.config.display, calculatorApp.config.container);
        let output = calculatorApp.validateInput(input.value, value);

        if (input.value == 0 || input.value == "Error") {
            input.value = output || 0;
        } else {
            input.value += output;
        }
    },
    validateInput : function (currentValue, newValue) {
        let lastValue = currentValue.slice(-1);
        let isLastValueOperator = calculatorApp.isOperator(lastValue);
        let isNewValueOperator = calculatorApp.isOperator(newValue);
        let isZerolastValue = lastValue == 0;
        let isEmptyOperator = isZerolastValue && calculatorApp.isMultiplyorDivideOperator(newValue);
        let isDuplicatedZero = isZerolastValue && newValue == 0;
    
        if (isEmptyOperator || isDuplicatedZero || isLastValueOperator && isNewValueOperator) {
            return '';
        }

        return newValue;
    },
    isOperator : function(value){
        let pattern = /([\+|\-|\*|\/])/;
        return pattern.test(value);
    }, 
    isMultiplyorDivideOperator : function(value){
        let pattern = /([\*|\/])/;
        return pattern.test(value);
    },
    isValidExpression : function(expression) {
        let pattern = /^(-?\d+)([\+|\-|\*|\/])(-?\d+)/;
        return pattern.test(expression) || /-?\d+/;
    },
    resolve: function(){
        let input = document.querySelector(calculatorApp.config.display, calculatorApp.config.container);
        if(calculatorApp.isValidExpression(input.value)) {
            input.value = calculatorApp.performEvaluation(input.value);
        } else {
            input.value = 0;
        }
    },
    performEvaluation: function(value){
        let result = eval(value);
        if (!isFinite(result)) {
            return "Error";
        }
        return result;
    }
  };

  (function () {
    document.onreadystatechange = function () {
        if (document.readyState == "complete") {
            calculatorApp.init(); 
      }
    }
    
})();
