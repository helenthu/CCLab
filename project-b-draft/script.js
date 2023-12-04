//////global
let kitty;
let soap;
let img;
let radio;
let xcord;
let ycord;
let soapMove = false;
let bubbles = [];
//let bubblesappear = false;
let shower;
let water = [];
let facemask;
let brushMove = false;
let toothbrush;
let toothbrushMove = false;
let toothbrushBrush = false;
let angle = 0;
let mouthfoam = [];
let mySound;
let songLP;


function preload(){

  img = loadImage("assets/livingroomcopy.png");
  radio = loadImage("assets/radio.png");
  musicnote = loadImage("assets/musicnote.png");
  musicnote2 = loadImage("assets/musicnote2.png");
  mySound = loadSound("assets/LP.mp3");
  bubblesound = loadSound("assets/bubblesound.mp3");
  watersound = loadSound("assets/water.mp3");
  teethbrushingsound = loadSound("assets/teethbrushing.mp3");
}




//////setup
function setup() {

  
  button = createButton("🔈");
  button.mousePressed(togglePlaying);
  
  
  
  xcord = width / 2;
  ycord = height / 2;

  createCanvas(800, 600);

  kitty = new Kitty(width / 2, height / 2);
  soap = new Soap(xcord, ycord);
  shower = new Shower(width/2, 90);
  facemask = new FaceMask(width/2, 580);
  toothbrush = new Toothbrush(490, 565);


  
  //water
  for (let i = 0; i < 500; i++) {
    water[i] = new Water(random(304,496), random(78, 105));
  }
  
  //bubbles
    for (let i = 0; i < 100; i++) {
    let x = random(310, 490);
    let y = random(220, 375);
    let radius = random(5, 20);
    let speedX = random(-1, 1);
    let speedY = random(-1, 1);
    let bubble = new Bubble(x, y, radius, speedX, speedY);
    bubbles.push(bubble);
  }
  
  

  
  
  //mouthfoam
    for (let i = 0; i < 70; i++) {
    let x = random(380, 425);
    let y = random(325, 350);
    let radius = random(5, 10);
    let speedX = random(-1, 1);
    let speedY = random(-1, 1);
    mouthfoam.push (new MouthFoam(x, y, radius, speedX, speedY));
  }
  
  
  
//////music button
  function togglePlaying(){
    if(!mySound.isPlaying()){
      mySound.play();
      mySound.setVolume(0.3);
      button.html("🔇");
    }else {
      mySound.pause();
      button.html("🔈");
    }
  }
}




//////draw
function draw() {


  image(img, 0, 0, 800, 600);
  image(radio, 150, 340, 100, 100);
  

  if(mySound.isPlaying()){
  image(musicnote, 180, 333, 17, 20);
  image(musicnote2, 215, 312, 13, 18);
  image(musicnote2, 195, 290, 13, 18);
  }
  
  
  
  push();
  //kitty.display1();
  kitty.display2();
  pop();
 
      
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].display2();
    

  //////bubbles appear when soap touches face
     if (soapTouchesKittyFace(bubbles[i])) {
      bubbles[i].display();
     //bubbles[i].update();
     //bubblesappear = true;
       
  //////shower
  shower.showerheaddisplay();
  
  for (let i = 0; i < water[i].length * 1; i++) {
    water[i].display();
    water[i].update();
    bubbles[i].display();
    }  
       
  } else{
       push();
       kitty.display1();
       pop();
     }
   }

  
//////mouthfoam appears when brushing teeth
  if(toothbrushTouchesMouth(mouthfoam)){
  kitty.display2();
  for (let i = 0; i < mouthfoam.length; i++) {
  mouthfoam[i].display();
  mouthfoam[i].update();
    } 
  }
  
  
//////table
  fill(173, 139, 114);
  quad(200, 600, 230, 530, 570, 530, 600, 600)
  
  
  soap.display();
  soap.update();
  

//////facemask bowl  
    fill(237, 236, 228);
    quad(370, 580, 370-15, 580-30, 370+55, 580-30, 370+40, 580);
    fill(183, 204, 149);
    ellipse(390, 556, 58, 7);
  
  
  //////facemask brush
  //facemask.display();
  
  // if(brushMove = true){
  //   facemask.onface();
  //   facemask.display2();
  // } else{
  //   facemask.display();
  // }
  
  
  if(brushTouchesKittyFace()){
    facemask.onface();
  }
  
  
  facemask.move();
  facemask. display2();
 

  toothbrush.display();
  toothbrush.update();
  toothbrush.update2();
  
  
  
  
//   // include this code in the draw(){...} loop
//   // it will show the position of your cursor on canvas
 //   fill(255, 0, 0);
 //   text('X: ' + mouseX + ',' + 'Y:' + mouseY, mouseX, mouseY);
  
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
   update(){
    bubblesound.play();
   }

  
}

//////bubbles when soap touches face
function soapTouchesKittyFace(bubble) {
  let d = dist(soap.x, soap.y, kitty.x, kitty.y);
  return d < 85;
  
} 


class Shower{
  constructor(startX, startY){
    this.x = startX
    this.y = startY
  }
  showerheaddisplay(){
    fill(184, 191, 191);
    rect(this.x-15, 0, 30, this.y);
    ellipse(this.x, this.y-6, 200, 40)
    fill(127, 135, 135);
    ellipse(this.x, this.y, 200, 30);
  }
}


class Water{
  constructor(startX, startY){
    this.x = random(304,496);
    this.y = random(78, 105);
    this.speed = random(20, 30);
    this.length = random(5, 30);
  }
  
  display(){
    push();
    strokeWeight(1.2);
    stroke(55, 188, 237);
    line(this.x, this.y, this.x, this.y + this.length);
    pop();
  }
  update() {
      this.y += this.speed;
      if (this.y > height) {
      this.y = random(90, 107);
      this.x = random(304, 496);
    }
  }
}


class FaceMask{
  constructor(startX, startY){
    this.x = startX;
    this.y = startY;
  }
  
    display(){
    fill(26, 13, 4);
    rect(this.x, this.y, 40, 10, 3);
    fill(64, 46, 33);
    quad(this.x+2, this.y, this.x-13, this.y-5, this.x-13, this.y+15, this.x+2, this.y+10);
  }
  
    display2(){
    push();
    fill(26, 13, 4);
    rect(this.x, this.y, 40, 10, 3);
    fill(64, 46, 33);
    quad(this.x+2, this.y, this.x-13, this.y-5, this.x-13, this.y+15, this.x+2, this.y+10);
    fill(183, 204, 149);
    quad(this.x-6, this.y-2, this.x-15, this.y-6, this.x-15, this.y+16, this.x-6, this.y+12);
    pop();
    }  
  
    onface(){
    push();
    stroke(168, 194, 132);
    fill(183, 204, 149, 180);
    ellipse(width/2, height/2, 188, 155);
    pop();
      
    translate(0, 6);
    
    push();
    stroke(168, 194, 132);
    fill(250)
    ellipse(352, 302, 60, 20); 
    ellipse(448, 302, 60, 20);
    pop();
    
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
  
    move(){
    let d = dist(mouseX, mouseY, this.x, this.y);

    if (mouseIsPressed && d < 80 / 2) {
      brushMove = true;
    }
    if (brushMove && !mouseIsPressed){
      brushMove = false;
     }

    if (brushMove) {
      this.x = mouseX;
      this.y = mouseY;
    }
   
  }
  
}

//////face mask appears when brush touches Kitty's face
function brushTouchesKittyFace() {
  let d = dist(facemask.x, facemask.y, kitty.x, kitty.y);
  return d < 85;
} 


//////toothbrush class
class Toothbrush{
  constructor(startX, startY, speedX, speedY){
    this.x = startX;
    this.y = startY;
    this.speedX = speedX;
    this.speedY = speedY;
  }
  display(){
    fill(227, 109, 131);
    rect(this.x, this.y, 66, 6, 2);
    fill(230);
    rect(this.x+2, this.y-6, 17, 9);
    // fill(152, 227, 211)
    // ellipse(this.x+10, this.y-5, 13, 6)
  }
  update(){
    let d = dist(mouseX, mouseY, this.x+10, this.y);

    if (mouseIsPressed && d < 40) {
      toothbrushMove = true;
    }
    if (toothbrushMove && !mouseIsPressed){
      toothbrushMove = false;
     }

    if (toothbrushMove) {
      this.x = mouseX;
      this.y = mouseY;
    }
  }
  update2(){
    let d = dist(this.x+10, this.y, 400, 335);

    if (mouseIsPressed && d < 15) {
      toothbrushBrush = true;
    }
    
    if (toothbrushBrush && !mouseIsPressed){
      toothbrushBrush = false;
      angle += 0;
     }

    if (toothbrushBrush) {
      //angle += 0.02
      this.x = mouseX;
      this.y += random(-5,5);
    } else{
      angle += 0;
    }
  }
}


class MouthFoam{
  constructor(x, y, radius, speedX, speedY){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speedX = speedX;
    this.speedY = speedY;
  }
  display(){
  push();
  fill(173, 215, 222, 130);
  stroke(135, 192, 201, 150);
  ellipse(this.x, this.y, this.radius );
  pop();
  }
  update(){
    this.x += this.speedX;
    this.y += this.speedY;
    
    this.x = constrain(this.x, 380, 425);
    this.y = constrain(this.y, 325, 350);
    
    if (this.x + this.radius >= 424 || this.x - this.radius <= 381) {
      this.speedX *= -1;
    }
    if (this.y + this.radius >= 349 || this.y - this.radius <= 326) {
      this.speedY *= -1;
    }
  }
}



function toothbrushTouchesMouth() {
  let d = dist(toothbrush.x, toothbrush.y, 400, 335);
  return d < 18;
}



//////sound effects
   function soundEffects(){
  if (soapTouchesKittyFace(bubbles[i])){
     bubbles[i].update();
     watersound.play();
   }
  if (toothbrushTouchesMouth()) {
    teethbrushingsound.play();
    }
  }

