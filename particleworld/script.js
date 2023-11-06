// CCLab Mini Project - 9.R Particles Template

let NUM_OF_PARTICLES = 400; // Decide the initial number of particles.
let NUM_OF_CLOUDS = 30;
let rain = [];
let cloud = [];
let wave = [];

function setup() {
  let canvas = createCanvas(600, 600);
 // canvas.parent("canvasWrapper");

  // generate particles
  for (let i = 0; i < NUM_OF_PARTICLES; i++) {
    rain[i] = new Rain(random(width), random(height));
                       
    wave[i] = new Wave(random(width), random(height));
    
    if (i < NUM_OF_CLOUDS) {
      cloud[i] = new Cloud(random(width), random(10, 100));
    }
  }
}

function draw() {
  background(60, 60, 80);

  // update and display
  for (let i = 0; i < rain.length; i++) {
    let r = rain[i];
    r.update();
    r.display();
    
    let c = cloud[i];
    if (c) {
    c.display();
    }
    let w = wave[i];
    w.update();
    w.display();
  }
}

class Rain {
  // constructor function
  constructor(startX, startY) {
    this.x = random(width);
    this.y = random(-200, -100);
    this.speed = random(2, 5);
    this.length = random(10, 20);
  }
  // methods (functions): particle's behaviors
  update() {
      this.y += this.speed;
      if (this.y > height) {
      this.y = random(-200, -100);
      this.x = random(width);
    }
  }
  display() {
    // particle's appearance
    push();
    translate(this.x, this.y);

    stroke(197, 209, 227);
    line(this.x, this.y, this.x, this.y + this.length);

    pop();
  }
}


class Cloud {
  constructor(startX, startY){
    this.x = random(width);
    this.y = random(10,100);
    this.dia = random(80,200);
    this.dia2 = random(80,150);
    this.alpha = random(2,10);
  }
  display() {
    stroke(170);
    fill(230,100);
    ellipse(this.x, this.y, this.dia, this.dia2, this.alpha);
  }
}


class Wave {
  constructor(startX, startY){
    this.x = random(width);
    this.y = 620;
    this.dia = 200;
    this.speed = (0.005,0.05);
  }
  update() {
    this.y += this.speed;
    if (this.y > height) {
    this.y = random(620, 650); 
    }


  }
  display() {
    stroke(93, 134, 168, 120);
    fill(149, 181, 207);
    circle(this.x, this.y, this.dia);
  }
}