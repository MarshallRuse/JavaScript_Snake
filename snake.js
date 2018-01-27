//Entities

const ctx = document.querySelector("#canvas").getContext("2d");
const unit = 32;

var Food = () => {
	let x = Math.floor(Math.random() * (17 - 1) + 2) * unit;
	let y = Math.floor(Math.random() * (17 - 1) + 3)* unit;
	console.log("x is: " + x + ", y is: " + y);
	return {x, y};
};

var GameBoard = (() => {
	const RIGHT_WALL = 17*unit;
	const LEFT_WALL = 2*unit;
	const BOTTOM_WALL = 17*unit;
	const TOP_WALL = 4*unit;

	
	let foodItem = Food();
	
	const newFood = () => {
		foodItem = Food();
		console.log(foodItem);
	}

	const getFood = () => {
		return foodItem;
	}
	
	return {unit, RIGHT_WALL, LEFT_WALL, BOTTOM_WALL, TOP_WALL, getFood, newFood};
})();


var Snake = (() => {
	let x = 10 * unit;
	let y = 10 * unit;
	let dir = "r";

	let body = [];
	body.unshift({x, y});

	const moveRight = () => {
		x = body[0].x + unit;
		body.unshift({x, y});
		body.pop();
	}

	const moveLeft = () => {
		x = body[0].x - unit;
		body.unshift({x, y});
		body.pop();
	}

	const moveUp = () => {
		y = body[0].y - unit;
		body.unshift({x, y});
		body.pop();
	}

	const moveDown = () => {
		y = body[0].y + unit;
		body.unshift({x, y});
		body.pop();
	}

	const hasEaten = () => {
		let food = GameBoard.getFood();
		if (body[0].x == food.x && body[0].y == food.y){
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

		let food = GameBoard.getFood();
		let foodItem = {
			style: "red",
			x_loc: food.x,
			y_loc: food.y,
		};

		// the game board
		ctx.rect(unit, unit, 19*unit, 19*unit);
		ctx.stroke();
		ctx.drawImage(bg, 0, 0);

		//the snake
		for (let i = 0; i < Snake.body.length; i++){
			ctx.fillStyle = "white";
			ctx.fillRect(Snake.body[i].x, Snake.body[i].y, unit, unit);
		}
		
		ctx.fillStyle = foodItem.style;
		ctx.fillRect(foodItem.x_loc, foodItem.y_loc, unit, unit);

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
	
	
})();
