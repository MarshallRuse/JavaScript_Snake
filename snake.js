//Entities

const ctx = document.querySelector("#canvas").getContext("2d");
const unit = 32;

var Snake = (() => {
	let x = 10 * unit;
	let y = 10 * unit;
	let dir = "r";

	let body = [];
	body.unshift({x, y});
	let head = body[0];

	const moveRight = () => {
		
		let newX = head.x + unit;
		let y = head.y;
		body.unshift({newX, y});
		body.pop();
	}

	const moveLeft = () => {
		body.pop();
		let newX = head.x - unit;
		let y = head.y;
		body.unshift({newX, y})
	}

	const moveUp = () => {
		body.pop();
		let newY = head.y + unit;
		let x = head.x
		body.unshift({x, newY});
	}

	const moveDown = () => {
		body.pop();
		let newY = head.y - unit;
		let x = head.x;
		body.unshift({x, newY});
	}

	const alive = () => {
		return true;
	}

	return {body, dir, moveLeft, moveRight, moveDown, moveUp};
})();

var Food = () => {
	let x = Math.floor(Math.random() * (17 - 1) + 2) * unit;;
	let y = Math.floor(Math.random() * (17 - 1) )* unit;
}

//Gameplay



//Controls

var Controls = (() => {

	const direction = (event) => {
		if (event.keyCode == 37 && Snake.dir != "r"){
			Snake.dir = "l";
		}
		else if (event.keyCode == 38 && Snake.dir != "d"){
			Snake.dir = "u";
		}
		else if (event.keyCode == 39 && Snake.dir != "l"){
			Snake.dir = "r";
		}
		else if (event.keyCode == 40 && Snake.dir != "u"){
			Snake.dir = "d";
		}
	}

	document.addEventListener("keydown", direction);

})();


//Display

var Display = (() => {

	let bg = new Image();
	bg.src = "./images/background.jpg";
	


	const draw = () => {

		// the game board
		ctx.rect(unit, unit, 19*unit, 19*unit);
		ctx.stroke();
		ctx.drawImage(bg, 0, 0);

		//the snake
		for (let i = 0; i < Snake.body.length; i++){
			ctx.fillStyle = "white";
			ctx.fillRect(Snake.body[i].x, Snake.body[i].y, unit, unit);
		}
		

	}
	
	return {draw};
})();


var GamePlay = (() => {

	const update = () => {

		if (Snake.dir == "l"){
			Snake.moveLeft();
		}
		else if (Snake.dir == "u"){
			Snake.moveUp();
		}
		else if (Snake.dir == "r"){
			Snake.moveRight();
		}
		else if (Snake.dir == "d"){
			Snake.moveDown();
		}

	}

	let score = 0;
	//update
	setInterval(update, 1000);
	//render
	setInterval(Display.draw, 100);
	

	//keep snake constantly moving


	
})();
