function locateEmptyTile(){}
function equalArrays(){}
function containsElement(){} 
function moveToEmptyTile(){}
function locateTile(){}
let occupiedLocations

$(document).ready(function(){

	allLocations      = []
	empttTileLocation = []
	puzzlePieces      = Array.from($("#puzzlearea").children());

	for(i=0;i<4;i++){
			for (j=0;j<4;j++){
				allLocations.push([i*100,j*100]);
		}
	}
	for (i=0;i<puzzlePieces.length;i++){
		puzzlePieces[i].classList.add("puzzlepiece");
	}
	for (i=0;i<4;i++){
		puzzlePieces[i].style.top                = "0px";
		puzzlePieces[i].style.left               = `${100*i}px`;
		puzzlePieces[i].style.backgroundPosition = `${-100*i}px 0px`;
	}
	for (i=4;i<8;i++){
		puzzlePieces[i].style.top                = "100px";
		puzzlePieces[i].style.left               = `${100*(i%4)}px`;
		puzzlePieces[i].style.backgroundPosition = ` ${-100*(i%4)}px -100px`
	}
	for (i=8;i<12;i++){
		puzzlePieces[i].style.top                = "200px";
		puzzlePieces[i].style.left               = `${100*(i%4)}px`;
		puzzlePieces[i].style.backgroundPosition = `${-100*(i%4)}px -200px`
	}
	for (i=12;i<15;i++){
		puzzlePieces[i].style.top                = "300px";
		puzzlePieces[i].style.left               = `${100*(i%4)}px`;
		puzzlePieces[i].style.backgroundPosition = `${-100*(i%4)}px -300px`
	}

	function puzzlePieceLocation(puzzlepiece){
		return [parseInt(puzzlepiece.style.left),parseInt(puzzlepiece.style.top)]
	}


	equalArrays = function(array1,array2){
		return array1[0]===array2[0] && array1[1]===array2[1]
	}

	containsElement = function (array, element){
		for(i=0;i<array.length;i++){
			if (equalArrays(array[i],element)){
				return true;
			}
		}return false;
	}

	locateEmptyTile = function(){
		occupiedLocations = puzzlePieces.map(function(puzzlepiece){
			return puzzlePieceLocation(puzzlepiece);
		})
		for(i=0;i<allLocations.length;i++){
			if(!containsElement(occupiedLocations,allLocations[i])){
				return allLocations[i];
			}
		}
	}

	locateTile = function(left, top){
		for (i=0;i<occupiedLocations.length;i++){
			if(equalArrays(allLocations[i],[left,top])){
				return allLocations[i];
			}
		}
	}

	moveToEmptyTile = function (puzzlepiece){
		empttTileLocation = locateEmptyTile();
		pieceLocation = puzzlePieceLocation(puzzlepiece);
		

	}



	



})

