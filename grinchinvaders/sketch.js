var santas = []; //stores the floating santas
var presents = []; //allows multiple presents to be dropped
var bullets = []; //stores bullets fired by grinch
var cooldown = 0; //cooldown time for bullets
var gamemode = 1; //stores current game state 0 (game over), 1 (normal), 2 (next level)
var counter = 1; //stores user lives
var g; //stores the grinch (ship)
var frame; //the "frame" of the santas array
var time; //time variable for animation
var currentLevel = 0; //variable which allows game to be infinite ie. each level gets "harder" according to this variable

var sounds = { //sounds object
	"grinchLaugh": null,
	"grinchAngry": null,
	"santaLaugh": null,
}

var images = { //images object
	"gimg": null,
	"b": null,
	"claus": null,
	"present": null,
}
//preload can be replaced with callback + game instructions
function preload() { //loads all the images and sounds
	images.present = loadImage("images/presents.png")
	images.gimg = loadImage("images/grinch.png");
	images.b = loadImage("images/bullet.png");
	images.claus = loadImage("images/santa3.png")
	sounds.grinchLaugh = loadSound("sounds/grinchLaugh.mp3");
	sounds.grinchAngry = loadSound("sounds/grinchAngry.mp3");
	sounds.santaLaugh = loadSound("sounds/santaLaugh2.mp3");
}

function setup() {
	createCanvas(600, 500);
	initcomponents(); //defines some basic stuff eg. fill
	frame = new SantaArray(400, 200, 11, 5);
	g = new Grinch(images.gimg);
	makeShips();
}

function draw() {
	if (gamemode === 1) { //determines how the game will be played
		background(4, 76, 41); //nice christmasy green
		if (frameCount % 100 === 0) { //adds present every 100 frames
			var pnum = int(random(currentLevel, currentLevel + currentLevel)); // uses the level variable to set difficulty (# of presents dropped)
			addPresents(pnum);
			console.log(currentLevel);
		}
		frame.update(); //moves the santaArray object
		g.show(); //shows the grinch
		g.move(); //updates the grinch's position according to direction
		for (var i = presents.length - 1; i >= 0; i--) { //shows and updates position of all presents
			presents[i].make();
			presents[i].update();
			if (presents[i].touching(g)) { //checks to see if any presents are touching the Grinch
				presents.splice(i, 1); //removes the present
				g.shrink(0.9); //shrinks the Grinch
				sounds.grinchAngry.play();
			}
		}

		for (var i = bullets.length - 1; i >= 0; i--) {
			bullets[i].show();
			bullets[i].move();
			for (var j = 0; j < santas.length; j++) {
				if (bullets[i].hits(santas[j])) { //double for loop to check if any bullet is hitting any santa
					bullets[i].toDelete = true; //marks them as "ready" to delete
					santas[j].toDelete = true;
					sounds.grinchLaugh.play();
				}
			}
			if (bullets[i].offscreen()) {
				bullets[i].toDelete = true; //also marks bullets as "ready" if they are offscreen to reduce lag
			}
			if (bullets[i].toDelete) {
				bullets.splice(i, 1); //deletes if marked
			}
		}

		for (var i = santas.length - 1; i >= 0; i--) {
			santas[i].show();
			santas[i].update();
			if (santas[i].touching(g)) { //should change to santaArray touching
				reset(0); //if any santa is touching Grinch (they fall every time they hit the edge) display game over
			}
			if (santas[i].toDelete) {
				santas.splice(i, 1);
			}
		}
		textSize(64); //shows lives and level
		text(counter, width - 50, height - 50);
		text(currentLevel, 50, height - 50);
		textSize(12);
		text("Lives", width - 50, height - 112);
		text("Level", 50, height - 112);
		if (gameOver()) { //checks to see if lives are below or equal to 0
			reset(0);
		}
	} else if (gamemode === 0) {
		background(51); //stops game
		text("GAME OVER!", width / 2, height / 2);
	} else if (gamemode === 2) {
		background(51); // moves to next level
		text("NEXT LEVEL!", width / 2, height / 2);
		if (time < millis()) { //displays next level screen for 1 second
			reset(1);
			nextLevel();
		}
	}
}

function gameOver() {
	return counter <= 0;
}

function initcomponents() {
	fill(255);
	imageMode(CORNER);
	textAlign(CENTER);
}

function addPresents(k) {
	if (!(santas.length <= 0)) {
		presents = [];
		for (var j = 0; j < k; j++) {
			var index = int(random(santas.length));
			var m = santas[index];
			presents.push(new Present(m.x, m.y, images.present));
			sounds.santaLaugh.play();
		}
	} else {
		time = millis() + 1000; //once there are no santas, move to next level
		reset(2);
	}
}

function reset(state) { //empties all arrays and sets gamemode
	santas = [];
	bullets = [];
	presents = [];
	gamemode = state;
}

function makeShips() { //positions ship in grid like form
	for (var i = 0; i < frame.w; i += frame.incrementX) {
		for (var j = 0; j < frame.h; j += frame.incrementY) {
			santas.push(new Santa(i, j, frame, images.claus));
		}
	}
}

function nextLevel() { //carries on lives and increases levels
	currentLevel++;
	counter = currentLevel + currentLevel + 1;
	frame.x = 0;
	frame.y = 0;
	makeShips();
}

function keyReleased() {
	if (keyCode == LEFT_ARROW || keyCode == RIGHT_ARROW) {
		g.setDir(0);
	}
}

function keyPressed() {
	if (keyCode == LEFT_ARROW) {
		g.setDir(-1);
	} else if (keyCode == RIGHT_ARROW) {
		g.setDir(1);
	} else if (key == ' ' && cooldown < millis()) {
		bullets.push(new Bullet(g.x + ((g.grinch.width * g.size) / 2), height, images.b));
		cooldown = millis() + (currentLevel + 1) * 75;
	}
}
