//////global
let kitty;
let soap;
let img;
let xcord;
let ycord;
let soapMove = false;
let bubbles = [];

function preload() {
  img = loadImage("livingroom.png");
}

//////setup
function setup() {
  xcord = width / 2;
  ycord = height / 2;

  createCanvas(800, 600);

  kitty = new Kitty(width / 2, height / 2);
  soap = new Soap(xcord, ycord);
  
  //bubbles
    for (let i = 0; i < 100; i++) {
    let x = random(310, 490);
    let y = random(220, 375);
    let radius = random(5, 20);
    let speedX = random(-2, 2);
    let speedY = random(-2, 2);

    let bubble = new Bubble(x, y, radius, speedX, speedY);
    bubbles.push(bubble);
  }
  
  
}

//////draw
function draw() {
  image(img, 0, 0, 800, 600);

  push();
  //kitty.display1();
  kitty.display2();
  pop();
 
      
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].display2();

    //bubbles appear when soap touches face
    if (soapTouchesKittyFace(bubbles[i])) {
      bubbles[i].display();
    } else{
      push();
      kitty.display1();
      pop();
    }
  }

  
//////dock
  fill(173, 139, 114);
  quad(200, 600, 230, 530, 570, 530, 600, 600)
  
  
  soap.display();
  soap.update();

  // include this code in the draw(){...} loop
  // it will show the position of your cursor on canvas
  //fill(255, 0, 0);
  //text('X: ' + mouseX + ',' + 'Y:' + mouseY, mouseX, mouseY);
}



//////kitty class
class Kitty{
  constructor(startX, startY){
    this.x = startX;
    this.y = startY;
  }
  
  display1(){
    
  //////body
    fill(255);
    push();
    
    //torso
    push();
    ellipse(402, 450, 170, 250);
    pop();
    
    //L leg
    push();
    ellipse(356, 560, 50, 100);
    pop();
    
    //R Leg
    push();
    ellipse(450, 560, 50, 100);
    pop();
    
    //towel
    push();
    fill(245, 215, 219);
    rect(320, 400, 165, 175, 20);
    pop();
    
    //L arm
    push();
    //translate(130, -60)
    rotate(0.3);
    ellipse(430, 310, 50, 120);
    pop();
    
    //R arm
    push();
    rotate(-0.3);
    ellipse(340, 545, 50, 120);
    pop();
    
    pop();
    
  
  //////head
    push();
    
    //head shape
    //noStroke();
    fill(255);
    ellipse(width/2, height/2, 200, 170);
    
    //L ear
    push();
    bezier(303, 285, 260, 200, 290, 204, 350, 227);
    pop();
    
    //R ear
    push();
    bezier(450, 228, 535, 200, 533, 204, 497, 285);
    pop();
    
    pop();
  
    
  //////face
    translate(0, 6);
    fill(0);
    
    push();
    
    push();
    //L eye
    ellipse(352, 302, 45, 10);
    triangle(331, 302, 323, 295, 345, 301);
    pop();
    
    //R eye
    push();
    ellipse(448, 302, 45, 10);
    triangle(469, 302, 478, 295, 454, 301);
    pop();
    
    //nose
    triangle(402, 320, 394, 314, 410, 314);
    
    pop();
    
  }  
  
  
  display2(){
    
      //////body
    fill(255);
    push();
    
    //torso
    push();
    ellipse(402, 450, 170, 250);
    pop();
    
    //L leg
    push();
    ellipse(356, 560, 50, 100);
    pop();
    
    //R Leg
    push();
    ellipse(450, 560, 50, 100);
    pop();
    
    //towel
    push();
    fill(245, 215, 219);
    rect(320, 400, 165, 175, 20);
    pop();
    
    //L arm
    push();
    //translate(130, -60)
    rotate(0.3);
    ellipse(430, 310, 50, 120);
    pop();
    
    //R arm
    push();
    rotate(-0.3);
    ellipse(340, 545, 50, 120);
    pop();
    
    pop();
    
    
  
  //////head
    push();
    
    //head shape
    //noStroke();
    fill(255);
    ellipse(width/2, height/2, 200, 170);
    
    //L ear
    push();
    bezier(303, 285, 260, 200, 290, 204, 350, 227);
    pop();
    
    //R ear
    push();
    bezier(450, 228, 535, 200, 533, 204, 497, 285);
    pop();
    
    pop();

    
    
  //////face

    fill(0);
    
    push();
    
    push();
    //L eye
    strokeWeight(4);
    line(370, 306, 335, 295);
    line(370, 306, 337, 312);
    pop();
    
    //R eye
    push();
    strokeWeight(4);
    line(433, 306, 469, 295);
    line(433, 306, 466, 312);
    pop();
    
    //nose
    triangle(402, 320, 394, 314, 410, 314);
    
    pop();
    
  }
  
 
}



/////////SOAP
class Soap {
  constructor(startX, startY) {
    this.x = 273;
    this.y = 567;
    this.rad = 55;
  }

  display() {
    fill(171, 219, 201);
    ellipse(this.x, this.y, this.rad);

    fill(92, 158, 133);
    textStyle(BOLD);
    text('SOAP', this.x - 17, this.y + 5);
  }

  update() {
    let d = dist(mouseX, mouseY, this.x, this.y);

    if (mouseIsPressed && d < this.rad / 2) {
      soapMove = true;
    }

    if (soapMove && !mouseIsPressed) {
      soapMove = false;
    }

    if (soapMove) {
      this.x = mouseX;
      this.y = mouseY;
    }
    
    
    
  }
}


//////bubbles class
class Bubble{
  constructor(x, y, radius, speedX, speedY){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speedX = speedX;
    this.speedY = speedY;
  }
  
  display(){
    push();
    fill(192, 224, 237, 75);
    stroke(108, 185, 217, 120);
    strokeWeight(0.8);
    ellipse(this.x, this.y, this.radius * 2);
    pop();
  }
  
  display2(){
    //:P
  }

  
}

//////bubbles when soap touches face
function soapTouchesKittyFace(bubble) {
  let d = dist(soap.x, soap.y, kitty.x, kitty.y);
  return d < 85;
}