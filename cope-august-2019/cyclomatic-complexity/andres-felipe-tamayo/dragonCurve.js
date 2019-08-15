
    // cyclomatic complexity 
    // M = E-N +1
    // M = 7-6 + 1
    // M = 2
function* paperFold() {
        
    let sec ="1";
    const run = true;
    yield sec;

    while( run){
        let arraySec="";
        lastLetter="1";
        for(i=0;i<sec.length;i++){
            arraySec=arraySec+lastLetter;
            arraySec=arraySec+sec[i];

            if(lastLetter==="1")
                lastLetter="0";
            else
                lastLetter="1";
        }
        sec= arraySec;
        yield sec;
    }
}

