class calculatorBuilder {
    /**
     * creates the buttons on the dom
     */
    generateButtons(){
        const BUTTONLIST=[1,2,3,'/',4,5,6,'*',7,8,9,'+','CE',0,'=','-'];
        const mainDiv = document.querySelector('.inputContainer');

        for(let i=0; i<BUTTONLIST.length;i++){
            const btn = document.createElement('div');
            
            btn.innerHTML='<div><button>'+BUTTONLIST[i]+'</button></div>';
            btn.classList.add('col');
            mainDiv.appendChild(btn);
        }
    }
    /**
     * Enables click funcionality on the buttons
     * @param {*} cal 
     */
    generateButtonInteraction(cal){
        const BUTTONS =document.querySelectorAll('button');
        const NOT_NUMBERS=['+','-','*','/','=','CE']; //not allowed char to add when the input its empty
        Array.from(BUTTONS).forEach(button =>{
            button.addEventListener('click',function(){
                if(NOT_NUMBERS.indexOf(button.innerText) > -1){
                    cal.main(button.innerText);
                }else{
                    cal.main(parseInt(button.innerHTML));
                }
        
            });
        });
    }

    /**
     * enable write in the input
     * @param {*} cal 
     */
    generateKeyPressInteraction(cal){
        const INPUT =document.querySelector('#input_result');
        INPUT.addEventListener('keydown',function(event) {
            event.preventDefault();
            if(event.keyCode>=49 && event.keyCode<=57 && event.keyCode!=55)
                cal.main(parseInt(event.key));

            if(event.keyCode==46 || event.keyCode==8)
                cal.main("CE");

            if( (event.keyCode==48 && event.shiftKey) || event.keyCode==13)
                cal.main("=");

            if(event.keyCode==48 && !event.shiftKey)
                cal.main(parseInt(event.key));
            
            if(event.keyCode==171 && !event.shiftKey)
                cal.main("+");
            
            if(event.keyCode==171 && event.shiftKey)
                cal.main("*");

            if(event.keyCode==55 && event.shiftKey)
                cal.main("/");
            
            if(event.keyCode==55 && !event.shiftKey)
                cal.main(parseInt(event.key));
            
            if(event.keyCode==173)
                cal.main("-");
        });
    }
}