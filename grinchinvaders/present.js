function Present(xVal, yVal, pimg) {
    this.x = xVal;
    this.y = yVal;
    this.p = pimg;
    this.speed = 10;

    this.touching = function(k) {
        this.distance = dist(this.x, this.y, k.x, k.y);
        if (this.distance < (this.p.height / 2) + ((k.grinch.height * k.size) / 2)) {
            return true;
        } else {
            return false;
        }
    }

    this.make = function() {
      image(this.p, this.x, this.y);
    }

    this.update = function(){
      this.y += this.speed;
    }

    this.check = function(){
      return this.y > height;
    }
}
