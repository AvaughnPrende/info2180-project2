let images = [];
$(document).ready(function(){

	let menu    = $("<div></div>");
	let title   = $("<div>Change Character</div>");
	let luffy   = $("<img name = 'background.jpg' src ='background.jpg' height=95px width=95px)></img>");
	let zoro    = $("<img name = 'zoro.jpg'       src ='zoro.jpg'       height=95px width=95px)></img>");
	let sanji   = $("<img name = 'sanji.jpg'      src ='sanji.jpg'      height=95px width=95px)></img>");
	let chopper = $("<img name = 'chopper.jpg'    src ='chopper.jpg'    height=95px width=95px)></img>");

	
	menu.append(title);
	menu.append(luffy);
	menu.append(zoro);
	menu.append(sanji);
	menu.append(chopper);

	menu.css({
		"width": "210px",
		"height": "210px",
		"position": "absolute",
		"top": "200px",
		"left" : "1050px",
	})

	title.css({
		"background-color": "#9370DB",
		"width": "196px",
		"font-size" : "1.5em",
		"text-align": "center",
		"color": "white"
	})

	zoro.css({
		"margin": "2px",
		"margin-bottom": "1.0px"
	})

	sanji.css({
		"margin": "2px"
	})

	chopper.css({
		"margin": "2px"
	})

	luffy.css({
		"margin": "2px",
		"margin-bottom": "1.0px"
	})
	$('body').append(menu);

	let occupiedLocations = []
	let allLocations      = []
	let puzzlePieces      = Array.from($("#puzzlearea").children());
	images = [luffy,sanji,zoro,chopper];

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

	function movablePiece(puzzlepiece){
		return adjacentLocations(puzzlePieceLocation(puzzlepiece),locateEmptyTile())
	}

	function shuffle(){
		[...Array(160).keys()].forEach(function(){
			neighbours = puzzlePieces.filter(function(puzzlepiece){
			return movablePiece(puzzlepiece);
		})
			randomPuzzlePiece = neighbours[Math.floor(Math.random() * (neighbours.length))]
			moveToEmptyTile(randomPuzzlePiece);
		})
	}

	function changeImage(img){
		$("#puzzlepiece").backgroundImage = img;
	}

	function selectRandomBackground(){
		r = Math.floor(Math.random()*images.length)
		puzzlePieces.forEach(function(puzzlepiece){
			puzzlepiece.style.backgroundImage = "url('" +  images[r][0].name + "')";
		})
	}

})

