// CCLab Mini Project - 9.R Particles Template

let NUM_OF_PARTICLES = 30; // Decide the initial number of particles.

let particles = [];
let specialBall;

let button, button2, button3;
let input;
let slider;
let bLink = false;


function setup() {
  let canvas = createCanvas(600, 600);
  canvas.parent("canvasWrapper");

  specialBall = new BounceBall(random(width), random(height));
  specialBall.changeColor(255,0,0);
  specialBall.changeSize(40);

  //function to create all buttons and sliders 
  creatreInterface();

  
  // generate particles
  for (let i = 0; i < NUM_OF_PARTICLES; i++) {
    particles[i] = new BounceBall(random(width), random(height));
  }
}

function draw() {
  background(50);

  // update and display
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.move();
    p.bounce();
    p.changeSize(slider.value()); // change size based on slider value
    p.slowDown();
    p.collisionDetect(particles);

    if (bLink) {
      p.link (particles);
    }
    p.escapeFrom(specialBall);
    p.display();

  }


  specialBall.attractTo(mouseX, mouseY);
  specialBall.move();
  specialBall.bounce();
  specialBall.display();  
  specialBall.changeColor(255,255,0);
  specialBall.changeSize(35);
}


function creatreInterface(){
  button = createButton('change style');
  button.position(0, 0);
  button.parent('interfaces'); //insert the button into tag with interface id
  button.mousePressed(changeStyle);

  input = createInput(' ');
  input.position(100,0);
  input.parent('interfaces'); //insert the button into tag with interface id


  button2 = createButton('submit');
  button2.position(200, 0);
  button2.parent('interfaces'); //insert the button into tag with interface id
  button2.mousePressed(updateStr);


  //a slider from 0 to 50, default at 20
  slider = createSlider(0,50,20);
  slider.position(300,0);
  slider.style('width', '100px');
  slider.parent('interfaces');

  button3 = createButton('speed up');
  button3.position(450, 0);
  button3.parent('interfaces'); //insert the button into tag with interface id
  button3.mousePressed(changeSpd);
}

function changeStyle(){
  bLink = !bLink;
}

function updateStr(){
  for (let i = 0; i < particles.length; i++) {
    particles[i].changeText(input.value());
  }
}

function changeSpd(){
  for (let i = 0; i < particles.length; i++) {
    particles[i].speedUp();
  }
}