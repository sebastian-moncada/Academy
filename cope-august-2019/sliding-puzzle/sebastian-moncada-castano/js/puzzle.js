document.addEventListener("click",(event)=>{
	if(event.toElement.id=='start' || event.toElement.id=='reload'){
		reload();
	}else{
		var arrayValidate =getArrayValidate(parseInt(event.toElement.id));
		//console.log(arrayValidate);
		for (var item in arrayValidate) {
			var pos=validatePosition(arrayValidate[item]);
			if (pos.value==""){

				modify(pos.id,event.toElement.value);
				modify(event.toElement.id,'');
			}	
		}
		//console.log(validateForWin());
		if(validateForWin()==true){
			messageWin(0);
		}
	}

	if(event.toElement.className=="close"){
		messageWin(1);
	}
}); 

function shuffle(a) {
	var j, x, i;
	for (i = a.length - 1; i > 0; i--) {
		j = Math.floor(Math.random() * (i + 1));
		x = a[i];
		a[i] = a[j];
		a[j] = x;
	}
	return a;
}


function reload(){
	var arrayNumbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,''];
	shuffle(arrayNumbers);
	cont =document.getElementsByClassName("square-number");
	if(cont.length==0){
		var i=1;
		for (var item in arrayNumbers) {
			document.getElementById("box").appendChild(createInput(i,arrayNumbers[item]));
			document.getElementById("box").value="Reload";
			i++;
		} 
	}else{
		var i=1;
		for (var item in arrayNumbers) {
			dropInput(i);
			document.getElementById("box").appendChild(createInput(i,arrayNumbers[item]));
			i++;
		} 
	}
	document.getElementById("start").value="reload";
}

function createInput(i,item){
	var newElement = document.createElement('input');
	newElement.id = i;
	newElement.type = "button";
	newElement.className = "square-number";
	newElement.value = item;
	return newElement;
}

function modify(i,item){
	document.getElementById(i).value=item;
}


function dropInput(item){
	var element = document.getElementById(item);
	element.parentNode.removeChild(element);
}

function validatePosition(item){
	var prueba=document.getElementById(item);
	return prueba;
}

function validateForWin(){
	var arrayNumbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,''];
	arrayElements =document.getElementsByClassName("square-number");	
	for (var i = 0; i < 15; i++) {
		if(parseInt(arrayElements[i].value)!=arrayNumbers[i]){
			return false;
		}
	}
	return true;
}

function messageWin(num){
	
	if(num==0){
		document.getElementById("box-alert").style.display ="block";
	}else if(num==1){
		document.getElementById("box-alert").style.display ="none";

	}
}

function getArrayValidate(id){
	var array=[];
	switch(id) {
		case 1:
		array= [2,5];
		break;
		case 2:
		array= [1,3,6];
		break;
		case 3:
		array= [2,4,7];
		break;
		case 4:
		array= [3,8];
		break;
		case 5:
		array= [1,6,9];
		break;
		case 6:
		array= [2,5,7,10];
		break;
		case 7:
		array= [3,6,8,11];
		break;
		case 8:
		array= [4,7,12];
		break;
		case 9:
		array= [5,10,13];
		break;
		case 10:
		array= [6,9,11,14];
		break;
		case 11:
		array= [7,10,12,15];
		break;
		case 12:
		array= [8,11,16];
		break;
		case 13:
		array= [9,14];
		break;
		case 14:
		array= [10,13,15];
		break;
		case 15:
		array= [11,14,16];
		break;
		case 16:
		array= [12,15];
		break;
	}
	return array;
}

