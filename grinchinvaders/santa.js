function Santa(xVal, yVal, aSantaArray, pimg) {
  this.x = xVal;
  this.y = yVal;
  this.s = aSantaArray;
  this.toDelete = false;
  this.img = pimg;

  this.show = function() {
    image(this.img, this.x, this.y);
    
  }

  this.update = function() {
    this.x += this.s.xVel * this.s.direction;
    if (this.s.isTouching) {
      this.y += this.s.lower;
    }
  }
  
  this.touching = function(k){
     this.distance = dist(this.x, this.y, k.x, k.y);
        if (this.distance < (this.img.height / 2) + ((k.grinch.height * k.size) / 2)) {
            return true;
        } else {
            return false;
        }
    }
  }