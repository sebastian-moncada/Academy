class calculatorLogic {

    constructor(){
       this.INPUT_RESULT =document.getElementById("input_result");
       this.exec = false; //indicate if its time to result the operation
       this.NOT_ALLOW_FIRST=['+','-','*','/',0]; //not allowed char to add when the input its empty 
       this.operationType; //indicates with its the operation to result (+,-,*,/)   
       this.previusCharCount=0; //indicates if the previus character was chart (users can push more than one char continuesly)
    }
   
    /**
     * loads the button clicked value on the system
     * @param {*} val button clicked value
     */
    main(val){
    
        if(val==="CE"){
            this.INPUT_RESULT.value="";
            this.exec=false;
        }
        else { 
           
            this.validatesExecution(val);
            this.getPreviusCharCount(val);
            this.addChar(val);

        }
    }

    //get the previus char count //used to not allow to write more than one char at time
    getPreviusCharCount(val){
        if(typeof(val)==="string" && this.INPUT_RESULT.value.length>0) {
            if(val!=="="){
                this.previusCharCount++;
            }
            else{
                this.previusCharCount=0;
            }
        }else{
            this.previusCharCount=0;
        }
    }

    //validates if its possible to make the execution and launch it
    validatesExecution(val){
        if(typeof(val)==="string" && this.INPUT_RESULT.value.length>0) {
            if(this.exec && this.previusCharCount==0 ){
                this.calculate();
                this.exec=false;
            }
            this.exec=true;
            this.operationType=val;
        }
    }
    
    //adds new charts on the input (if its valid one)
    addChar(val){

        if(val!=="=" && this.previusCharCount<2 &&
            (!(this.INPUT_RESULT.value.length===0 && this.NOT_ALLOW_FIRST.indexOf(val) > -1))){

            this.INPUT_RESULT.value=this.INPUT_RESULT.value+val;
        }
    }
   
    /**
     * ejecutes the operation (+,-,*,/)
     */
    calculate(){
        let numbers=this.INPUT_RESULT.value.split(this.operationType);
        switch(this.operationType){
            case "+":
                this.INPUT_RESULT.value =parseFloat(parseFloat(numbers[0]) + parseFloat(numbers[1]));
                break
            case "-":
                this.INPUT_RESULT.value =parseFloat(parseFloat(numbers[0]) - parseFloat(numbers[1]));
                break;
            case "/":
                this.INPUT_RESULT.value =parseFloat(parseFloat(numbers[0]) / parseFloat(numbers[1]));
                break;
            case "*":
                this.INPUT_RESULT.value =parseFloat(parseFloat(numbers[0]) * parseFloat(numbers[1]));
                break;
        }
    }
}
