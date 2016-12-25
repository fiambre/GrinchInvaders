function Grinch(g) {
	this.grinch = g;
	this.x = (0.5*width) - (this.grinch.width/2);
	this.y = height - this.grinch.height;
	this.d = 0;
	this.size = 1;

	this.move = function() {
		this.x += this.d * 4;
		this.y = height - this.grinch.height * this.size;
	}

	this.setDir = function(dir) {
		this.d = dir;
	}

	this.show = function() {
		image(this.grinch, this.x, this.y, this.grinch.width * this.size, this.grinch.height*this.size);
	}

	this.shrink = function(rate) {
		this.size *= rate;
		counter--;
	}
}