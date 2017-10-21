$(document).ready(function(){


	puzzlePieces = $("#puzzlearea").children();

	for (i=0;i<puzzlePieces.length;i++){
		puzzlePieces[i].classList.add("puzzlepiece");
	}
	for (i=0;i<4;i++){
		puzzlePieces[i].style.top   = "0px";
		puzzlePieces[i].style.left  = `${100*i}px`;
		puzzlePieces[i].style.backgroundPosition = `${-100*i}px 0px`;
	}
	for (i=4;i<8;i++){
		puzzlePieces[i].style.top   = "100px";
		puzzlePieces[i].style.left  = `${100*(i%4)}px`;
		puzzlePieces[i].style.backgroundPosition = ` ${-100*(i%4)}px -100px`
	}
	for (i=8;i<12;i++){
		puzzlePieces[i].style.top   = "200px";
		puzzlePieces[i].style.left  = `${100*(i%4)}px`;
		puzzlePieces[i].style.backgroundPosition = `${-100*(i%4)}px -200px`
	}
	for (i=12;i<15;i++){
		puzzlePieces[i].style.top   = "300px";
		puzzlePieces[i].style.left  = `${100*(i%4)}px`;
		puzzlePieces[i].style.backgroundPosition = `${-100*(i%4)}px -300px`
	}







})

