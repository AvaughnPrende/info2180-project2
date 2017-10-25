function locateEmptyTile(){}
function equalArrays(){}
function containsElement(){} 
function moveToEmptyTile(){}
function locateTile(){}
function puzzlePieceLocation(){}
function changePuzzlePieceLocation(){}
function adjacentLocations(){}
function movablePiece(){}
let occupiedLocations;
emptyTileLocation = []
let temp;

$(document).ready(function(){
	occupiedLocations = []
	allLocations      = []
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
	for(i=0;i<puzzlePieces.length;i++){
		puzzlePieces[i].addEventListener('mouseover',function(){
			if(movablePiece(this)){
				this.classList.add("movablepiece");
			}
		})
	}

	puzzlePieceLocation = function(puzzlepiece){
		return [parseInt(puzzlepiece.style.left),parseInt(puzzlepiece.style.top)]
	}

	changePuzzlePieceLocation  = function (puzzlepiece, left, top){
		puzzlepiece.style.left = `${left}px`;
		puzzlepiece.style.top  = `${top}px`;
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
		let emptyTile;
		occupiedLocations = puzzlePieces.map(function(puzzlepiece){
			return puzzlePieceLocation(puzzlepiece);
		})
		allLocations.forEach(function(location){
    		if(!(containsElement(occupiedLocations,location))){
    			emptyTile = location;
    		}
		})
		return emptyTile;
	}

	moveToEmptyTile = function (puzzlepiece){
		let pieceLocation;

		emptyTileLocation = locateEmptyTile();
		pieceLocation     = puzzlePieceLocation(puzzlepiece);	
		//Swap location of empty tile and moving tile
		temp              = emptyTileLocation;
		emptyTileLocation = pieceLocation;
		pieceLocation     = temp;

		changePuzzlePieceLocation(puzzlepiece, pieceLocation[0],pieceLocation[1]);
	}

	adjacentLocations = function(location1, location2){
		[left1,top1]  = location1;
		[left2,top2]  = location2;

		if(left1 === left2 && top1 === top2 + 100){
			return true;
		}
		if(left1 === left2 && top1 === top2 - 100){
			return true;
		}
		if(top1   === top2 && left1 === left2 - 100){
			return true;
		}
		if(top1   === top2 && left1 === left2 + 100){
			return true;
		}
		return false;
	}

	movablePiece = function(puzzlepiece){
		return adjacentLocations(puzzlePieceLocation(puzzlepiece),locateEmptyTile())
	}
})

