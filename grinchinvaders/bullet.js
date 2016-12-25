function Bullet(xVal, yVal, bull) {
	this.b = bull;
	this.x = xVal - this.b.width/2;
	this.y = yVal;
	this.toDelete = false;

	this.show = function() {
		image(this.b, this.x, this.y);
	}

	this.hits = function(santa) {
		this.d = dist(this.x, this.y, santa.x, santa.y);
		if (this.d < (this.b.height / 2) + (santa.img.height / 2)) {
			return true;
		} else {
			return false;
		}
	}

	this.offscreen = function(){
		return this.y < 0;
	}

	this.move = function() {
		this.y += -5;
	}
}