let spiderX, spiderY; // spider position
let legLength = 250; // leg length
let bodySize = 50; // body size
let angle = 0; // angle for leg movement
let bee;


function setup() {
  createCanvas(600, 600);
  spiderX = width / 2;
  spiderY = height / 2;
  bee = new Bee();
}

function draw() {
  background(74, 102, 54);
  
  
  // spider's body
  fill(300);
  ellipse(spiderX, spiderY, bodySize, bodySize);

  // legs
  for (let i = 0; i < 6; i++) {
    let legX = spiderX + cos(angle + TWO_PI/6 * i) * legLength;
    let legY = spiderY + sin(angle + TWO_PI/6 * i) * legLength;
    stroke(300);
    strokeWeight(8);
    line(spiderX, spiderY, legX, legY);
  }

    // eyes
  fill(0);
  circle(spiderX+8, spiderY-6, 12);
  circle(spiderX-8, spiderY-4, 12);
  
  
  
  // Constrain spider's position to stay within the canvas
  spiderX = constrain(spiderX, 0+15, width-15);
  spiderY = constrain(spiderY, 0+15, height-15);
  

  
  // flower appears when mouse is pressed
    if (mouseIsPressed){
      
  // legs stop moving
  for (let i = 0; i < 6; i++) {
    let legX = spiderX + cos(angle + TWO_PI/6 * i) * legLength;
    let legY = spiderY + sin(angle + TWO_PI/6 * i) * legLength;
    stroke(300);
    strokeWeight(6);
    line(spiderX, spiderY, legX, legY);
    
    angle += 0;
  }
  
  // flower petals
  fill(300);
  circle(spiderX+40, spiderY+40, 80);
  fill(300);
  circle(spiderX+40, spiderY-40, 80);
  fill(300);
  circle(spiderX-40, spiderY+40, 80);
  fill(300);
  circle(spiderX-40, spiderY-40, 80);
  fill(300);
  circle(spiderX, spiderY+55, 80);
  fill(300);
  circle(spiderX, spiderY-55, 80);
  fill(300);
  circle(spiderX+55, spiderY, 80);
  fill(300);
  circle(spiderX-55, spiderY, 80);
      
  fill(220);
  circle(spiderX+25, spiderY+25, 40);
  fill(220);
  circle(spiderX+25, spiderY-25, 40);
  fill(220);
  circle(spiderX-25, spiderY+25, 40);
  fill(220);
  circle(spiderX-25, spiderY-25, 40);
  fill(220);
  circle(spiderX, spiderY+40, 40);
  fill(220);
  circle(spiderX, spiderY-40, 40);
  fill(220);
  circle(spiderX+40, spiderY, 40);
  fill(220);
  circle(spiderX-40, spiderY, 40);
      
  fill(237, 235, 168);
  circle(spiderX, spiderY, 70);
  fill(237, 235, 168);
  circle(spiderX, spiderY, 30);

}else{
  angle += 0.02;
  // move the spider around
  spiderX += random(-4, 4);
  spiderY += random(-4, 4);
}

  
  // Bee
  noStroke();
  bee.display();
  bee.move();
  bee.checkEdges();
  bee.followMouse();
  
  
}




class Bee {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.size = 20;
  }

  display() {
    fill(245, 210, 56);
    ellipse(this.x, this.y, 20, 30);
    push();
    stroke(0);
    line(this.x-7, this.y, this.x+7, this.y );
    pop();
    fill(194, 191, 184, 150)
    ellipse(this.x-15, this.y, 23, 13);
    ellipse(this.x+15, this.y, 23,13);
    

    
  }

  move() {
    this.x += random(-4, 4);
    this.y += random(-4, 4);
  }

  checkEdges() {
    // Wrap the bee around the canvas when it reaches the edges
    if (this.x > width) this.x = 0;
    else if (this.x < 0) this.x = width;
    if (this.y > height) this.y = 0;
    else if (this.y < 0) this.y = height;
  }

  followMouse() {
    // Make bee follow mouse cursor
    let angle = atan2(mouseY - this.y, mouseX - this.x);
    this.x += cos(angle) * 4;
    this.y += sin(angle) * 4;
  }
  
  
  
}