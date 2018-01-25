//Entities

const ctx = document.querySelector("#canvas").getContext("2d");


var GameBoard = (() => {
	const unit = 32;
	const RIGHT_WALL = 17*unit;
	const LEFT_WALL = 2*unit;
	const BOTTOM_WALL = 17*unit;
	const TOP_WALL = 4*unit;

	/*
	let foodItem = Food();
	
	const newFood = () => {
		foodItem = Food();
	}
	*/
	return {unit, RIGHT_WALL, LEFT_WALL, BOTTOM_WALL, TOP_WALL};
})();


var Snake = (() => {
	let x = 10 * GameBoard.unit;
	let y = 10 * GameBoard.unit;
	let dir = "r";

	let body = [];
	body.unshift({x, y});

	const moveRight = () => {
		x = body[0].x + GameBoard.unit;
		body.unshift({x, y});
		body.pop();
	}

	const moveLeft = () => {
		x = body[0].x - GameBoard.unit;
		body.unshift({x, y});
		body.pop();
	}

	const moveUp = () => {
		y = body[0].y - GameBoard.unit;
		body.unshift({x, y});
		body.pop();
	}

	const moveDown = () => {
		y = body[0].y + GameBoard.unit;
		body.unshift({x, y});
		body.pop();
	}

	const hasEaten = () => {
		if (body[0].x == GameBoard.foodItem.x && body[0].y == GameBoard.foodItem.y){
			return true;
		}
		else{
			return false;
		}
	} 

	const alive = () => {
		return true;
	}

	return {body, dir, moveLeft, moveRight, moveDown, moveUp, hasEaten};
})();

var Food = () => {
	let x = Math.floor(Math.random() * (17 - 1) + 2) * GameBoard.unit;;
	let y = Math.floor(Math.random() * (17 - 1) )* GameBoard.unit;

	return {x, y};
};

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
		ctx.rect(GameBoard.unit, GameBoard.unit, 19*GameBoard.unit, 19*GameBoard.unit);
		ctx.stroke();
		ctx.drawImage(bg, 0, 0);

		//the snake
		for (let i = 0; i < Snake.body.length; i++){
			ctx.fillStyle = "white";
			ctx.fillRect(Snake.body[i].x, Snake.body[i].y, GameBoard.unit, GameBoard.unit);
		}
		
		ctx.fillStyle = "red";
		ctx.fillRect(Food.x, Food.y, GameBoard.unit, GameBoard.unit);

	}
	
	return {draw};
})();


var GamePlay = (() => {

	const update = () => {

		if (Snake.dir == "l" && Snake.body[0].x >= GameBoard.LEFT_WALL){
			Snake.moveLeft();
		}
		else if (Snake.dir == "u" && Snake.body[0].y >= GameBoard.TOP_WALL){
			Snake.moveUp();
		}
		else if (Snake.dir == "r" && Snake.body[0].x <= GameBoard.RIGHT_WALL){
			Snake.moveRight();
		}
		else if (Snake.dir == "d" && Snake.body[0].y <= GameBoard.BOTTOM_WALL){
			Snake.moveDown();
		}

		if (Snake.hasEaten()){
			GameBoard.newFood();
		}

	}

	let score = 0;
	//update
	setInterval(update, 150);
	//render
	setInterval(Display.draw, 100);
	

	//keep snake constantly moving


	
})();
