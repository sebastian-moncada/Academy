
class puzzleBuilder {

    // generate the puzzle
    generatePuzzle(){

        const BUTTONLIST=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
        const BUTTONSHUFFLE=this.shuffleArray(BUTTONLIST);

        for(let i=0; i<BUTTONLIST.length;i++){
            this.buildButton(BUTTONSHUFFLE[i],'buttonStandar');
        }
        this.buildButton('','buttonMove');
    }

    //adds click event to all button
    generateClickeable(puzzleL){
        const BUTTONS =document.querySelectorAll('button');
        Array.from(BUTTONS).forEach( (button,i) =>{
            button.addEventListener('click',function(){
                puzzleL.main(i,button);
            });
        });
    }


    //adds bottons on the puzzle
    buildButton(title,cssClass){
        const mainDiv = document.querySelector('.inputContainer');
        const btn = document.createElement('div');
        btn.innerHTML='<div><button class="'+cssClass+'">'+title+'</button></div>';
        btn.classList.add('col');
        mainDiv.appendChild(btn);
    }


    //reorder array elements
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        return array;
    }
}
