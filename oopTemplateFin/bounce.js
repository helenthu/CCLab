class BounceBall {
  // constructor function
  constructor(startX, startY) {
    // properties: particle's characteristics
    this.x = startX;
    this.y = startY;
    this.dia = 25;
    this.xSpd = random(-2,2);
    this.ySpd = random(-2,2);
    this.color = color(255);
    this.text = ' ';
  }

  changeSize(size){
    this.dia = size;
  }

  changeColor(r,g,b){
    this.color = color(r,g,b);
  }

  changeText(str){
    this.text = str;
  }

  move(){
    this.x += this.xSpd;
    this.y += this.ySpd;
    
  }

  //apply value less than 1 will slowdown things 
  slowDown(){
    this.xSpd *= 0.995;
    this.ySpd *= 0.995;
  }

  //apply value greater than 1 will speedup things 
  speedUp(){
    this.xSpd *= 3.05;
    this.ySpd *= 3.05;
  }

  bounce(){
    if (this.x > width || this.x < 0){
      this.xSpd = -this.xSpd;
    }

    if (this.y>height || this.y < 0) {
      this.ySpd = -this.ySpd;
    }
  }

  //check collision with a single object, passed in as an argument
  // collisionDetect(other){
  //   this.color = color(255);
  //   let d = dist(this.x, this.y, other.x, other.y);
  //   if(d < this.dia/2 + other.dia/2){
  //     //inside objs
  //     this.color = color(255,0,0);
  //   }
  // }

  collisionDetect(allObjects){
    this.color = color(255);
    for (let i = 0; i < allObjects.length; i++) {
      let p = allObjects[i];
      if(p != this){
        let d = dist(this.x, this.y, p.x, p.y);
        if(d < this.dia/2 + p.dia/2){
          //inside objs
          this.color = color(255,0,0);
        }
      }
    }
  }

  link(allObjects){
    this.color = color(255);
    for (let i = 0; i < allObjects.length; i++) {
      let p = allObjects[i];
      if(p != this){
        let d = dist(this.x, this.y, p.x, p.y);
        let maxLength = 200;
        let alpha = map(d,0, maxLength, 255, 0 );
        if(d < maxLength){
          //inside objs
          stroke(255,alpha);
          line(this.x ,this.y, p.x, p.y);
        }
      }
    }
  }


  attractTo(targetX, targetY){
    let accelX = (targetX - this.x)* 0.05;
    let accelY = (targetY - this.y) * 0.05;
    this.x += accelX;
    this.y += accelY;
  }
  
  escapeFrom(other){
    let d = dist(this.x, this.y, other.x, other.y);

    if(d<100){
      let accelX = (other.x - this.x)* 0.05 * -1;
      let accelY = (other.y - this.y) * 0.05 *-1;
      this.xSpd += accelX;
      this.ySpd += accelY;
    }

  }

  display() {
    // particle's appearance
    push();
    translate(this.x, this.y);
    fill(this.color);
    circle(0, 0, this.dia);
    stroke(255);
    text(this.text,0,0);
    pop();
  }

}
