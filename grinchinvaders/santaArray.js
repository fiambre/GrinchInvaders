function SantaArray(widthX, heightY, columns, rows) {
    this.w = widthX;
    this.h = heightY;
    this.x = 0;
    this.y = 0;
    this.lower = 15;
    this.shipsX = columns;
    this.shipsY = rows;
    this.incrementX = this.w / this.shipsX;
    this.incrementY = this.h / this.shipsY;
    this.direction = 1;
    this.xVel = 1;
    this.isTouching = false;

    this.update = function() {
        this.x += this.xVel * this.direction;
        this.touchingEdge();
    }

    this.make = function() {
        rect(this.x, this.y, this.w, this.h);
    }

    this.touchingEdge = function() {
        if (this.x + this.w > width || this.x < 0) {
            this.direction *= -1;
            this.y += this.lower;
            this.isTouching = true;
        } else {
            this.isTouching = false;
        }
    }
}
