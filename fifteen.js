let neighbours = [];
function movablePiece(){}
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

	$(".puzzlepiece").hover(
		function(){
			if(movablePiece(this)){
				$(this).addClass("movablepiece");
			}
		},
		function(){
			$(this).removeClass("movablepiece");
		})

	$(".puzzlepiece").click(function(){
		if(movablePiece(this)){
			moveToEmptyTile(this);
		}
	})	

	$("#shufflebutton").click(shuffle);


	function puzzlePieceLocation(puzzlepiece){
		return [parseInt(puzzlepiece.style.left),parseInt(puzzlepiece.style.top)]
	}

	function changePuzzlePieceLocation(puzzlepiece, left, top){
		puzzlepiece.style.left = `${left}px`;
		puzzlepiece.style.top  = `${top}px`;
	}

	function equalArrays(array1,array2){
		return array1[0]===array2[0] && array1[1]===array2[1]
	}

	function containsElement(array, element){
		for(i=0;i<array.length;i++){
			if (equalArrays(array[i],element)){
				return true;
			}
		}return false;
	}

	function locateEmptyTile() {
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

	function moveToEmptyTile(puzzlepiece){
		let pieceLocation;

		emptyTileLocation = locateEmptyTile();
		pieceLocation     = puzzlePieceLocation(puzzlepiece);	
		//Swap location of empty tile and moving tile
		temp              = emptyTileLocation;
		emptyTileLocation = pieceLocation;
		pieceLocation     = temp;

		changePuzzlePieceLocation(puzzlepiece, pieceLocation[0],pieceLocation[1]);
	}

	function adjacentLocations(location1, location2){
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

	 movablePiece  = function(puzzlepiece){
		return adjacentLocations(puzzlePieceLocation(puzzlepiece),locateEmptyTile())
	}

	function shuffle(){
		t0  = performance.now();
		[...Array(150).keys()].forEach(function(){
			neighbours = puzzlePieces.filter(function(puzzlepiece){
			return movablePiece(puzzlepiece);
		})
			randomPuzzlePiece = neighbours[Math.floor(Math.random() * (neighbours.length))]
			moveToEmptyTile(randomPuzzlePiece);
		})
		t1 = performance.now();
		console.log(`Duration: ${t1-t0}`);
	}
})

