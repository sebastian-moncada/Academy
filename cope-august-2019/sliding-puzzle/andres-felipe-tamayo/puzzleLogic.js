class puzzleLogic {

    constructor(){
        this.movePosition =15;
    }

    main(position,buttonClicked){
        if(this.validateButton(position)){
            this.moveButton(position,buttonClicked);
        }
        else{
            this.showButtonError(buttonClicked);
        }

    }

    /**
     * Asign the button to its next position
     */
    moveButton(position,buttonClicked){
        const newText=buttonClicked.innerHTML;
        const BUTTONS =document.querySelectorAll('button');

        Array.from(BUTTONS).forEach( (button,i) =>{
            if(i==position){
                button.classList.remove('buttonStandar')
                button.classList.add('buttonMove');
                button.innerHTML="";
            }
            if(i==this.movePosition){
                button.classList.remove('buttonMove')
                button.classList.add('buttonStandar');
                button.innerHTML=newText;
            }
         });
 
        this.movePosition=position;
    }

    /**
     * show error when users click unallowed button
     * @param {*} buttonClicked 
     */
    showButtonError(buttonClicked){
        const prevText=buttonClicked.innerHTML;
        buttonClicked.classList.add('buttonError');
        buttonClicked.innerHTML="X";
        setTimeout(function(){ 
            buttonClicked.classList.remove('buttonError'); 
            buttonClicked.innerHTML=prevText;
        }, 500);
    }

    //validates allows position to move
    //position->postion pretened button
    validateButton(position){

        const ALLOWEDXPOSITION=[
            [1,4],[0,2,5],[1,3,6],[2,7],
            [0,5,8],[4,6,1,9],[5,7,2,10],[6,3,11],
            [4,12,9],[8,10,5,13],[9,11,6,14],[7,15,10],
            [8,13],[12,14,9],[13,15,10],[14,11]
        ]

        let allowedPositions=ALLOWEDXPOSITION[this.movePosition];
        return(allowedPositions.includes(position));
   }
}