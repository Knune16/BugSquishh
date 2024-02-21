let sprite;
let bugs = [];
let timeLimit = 30;
let countDown;
let initialSpeed = 2;
let bugsKilled = 0;

function preload(){
  let animation = {
    dead: { row: 0, col: 6, frames: 1 },
    walkRight: { row: 0, frames: 5},
  };

  bugs.push(bug = new Bug(100,100,32,32,'Assets/Bugx4.png',animation));
  bugs.push(bug2 = new Bug(300,150,32,32,'Assets/Bugx4.png',animation));
  bugs.push(bug3 = new Bug(200,100,32,32,'Assets/Bugx4.png',animation));
  bugs.push(bug4 = new Bug(100,150,32,32,'Assets/Bugx4.png',animation));
  bugs.push(bug5 = new Bug(400,325,32,32,'Assets/Bugx4.png',animation));
  bugs.push(bug6 = new Bug(300,300,32,32,'Assets/Bugx4.png',animation));
  bugs.push(bug7 = new Bug(400,250,32,32,'Assets/Bugx4.png',animation));
  bugs.push(bug8 = new Bug(500,100,32,32,'Assets/Bugx4.png',animation));
  bugs.push(bug9 = new Bug(350,350,32,32,'Assets/Bugx4.png',animation));
  bugs.push(bug10 = new Bug(150,150,32,32,'Assets/Bugx4.png',animation));
  bugs.push(bug11 = new Bug(150,200,32,32,'Assets/Bugx4.png',animation));
  bugs.push(bug12 = new Bug(350,350,32,32,'Assets/Bugx4.png',animation));
  bugs.push(bug13 = new Bug(375,120,32,32,'Assets/Bugx4.png',animation));
  bugs.push(bug14 = new Bug(75,75,32,32,'Assets/Bugx4.png',animation));
  bugs.push(bug15 = new Bug(85,95,32,32,'Assets/Bugx4.png',animation));
  bugs.push(bug16 = new Bug(130,130,32,32,'Assets/Bugx4.png',animation));
  bugs.push(bug17 = new Bug(340,223,32,32,'Assets/Bugx4.png',animation));
  bugs.push(bug18 = new Bug(65,41,32,32,'Assets/Bugx4.png',animation));
  bugs.push(bug19 = new Bug(41,241,32,32,'Assets/Bugx4.png',animation));
  bugs.push(bug20 = new Bug(191,392,32,32,'Assets/Bugx4.png',animation));
  bugs.push(bug21 = new Bug(392,376,32,32,'Assets/Bugx4.png',animation));
  bugs.push(bug22 = new Bug(278,278,32,32,'Assets/Bugx4.png',animation));
  bugs.push(bug23 = new Bug(147,367,32,32,'Assets/Bugx4.png',animation));
  bugs.push(bug24 = new Bug(331,231,32,32,'Assets/Bugx4.png',animation));
  bugs.push(bug25 = new Bug(31,360,32,32,'Assets/Bugx4.png',animation));
  bugs.push(bug26 = new Bug(225,225,32,32,'Assets/Bugx4.png',animation));
  bugs.push(bug27 = new Bug(34,34,32,32,'Assets/Bugx4.png',animation));
  bugs.push(bug28 = new Bug(163,363,32,32,'Assets/Bugx4.png',animation));
  bugs.push(bug29 = new Bug(167,159,32,32,'Assets/Bugx4.png',animation));
  bugs.push(bug30 = new Bug(293,283,32,32,'Assets/Bugx4.png',animation));
  
}

function setup() {
  createCanvas(800, 400);
}

function mousePressed(){
  for (let bug of bugs){
    if(
      mouseX >= bug.sprite.x - bug.sprite.width / 2 &&
      mouseX <= bug.sprite.x + bug.sprite.width / 2 &&
      mouseY >= bug.sprite.y - bug.sprite.height / 2 &&
      mouseY <= bug.sprite.y + bug.sprite.height / 2){

        bug.stop();
    }
  }
}

function draw() {
  background(50);
  
  bugs.forEach((bug) => {  

    let cunrrentTime = int(millis() / 1000);
      countDown = timeLimit - cunrrentTime;

    if (!bug.isKilled){
      if(bug.sprite.x + bug.sprite.width/2 > width){
        bug.walkLeft();
        bug.sprite.x = width - bug.sprite.width / 2;
     } 
    else if (bug.sprite.x - bug.sprite.width/2 < 0){
       bug.walkRight();
       bug.sprite.x = bug.sprite.width / 2;
       } 
    }  

    if (countDown < 0){
      countDown = 0;
      textSize(50);
      text("Game\nOver", width / 2 - 75, height / 2);
      bug.stop();
    } 

    bug.update();
  });

 
  textSize(30);
  fill('white');
  text("Bugs Killed: " + bugsKilled, 550,25)
  text("" + countDown, 5,25);
}


class Bug{
  
  constructor(x,y,width,height,spriteSheet,animation){
  this.sprite = new Sprite(x,y,width,height);
  this.sprite.spriteSheet = spriteSheet;
  
  this.sprite.collider = 'none';
  this.sprite.anis.frameDelay = 6;
  this.sprite.addAnis(animation);
  this.sprite.vel.x = initialSpeed;
  this.sprite.changeAni('walkRight');

  this.isKilled = false;
  }

  walkRight(){
    this.sprite.changeAni('walkRight');
    
    this.sprite.vel.x = 2;
    this.sprite.scale.x = 1;
    this.sprite.vel.y = 0;
   }
   
   walkLeft(){
     this.sprite.changeAni('walkRight');
     
     this.sprite.vel.x = -2;
     this.sprite.scale.x = -1;
     this.sprite.vel.y = 0;
   }
   
   stop(){

      if (!this.isKilled){
        bugsKilled++;
        this.isKilled = true;
        this.sprite.changeAni('dead');
        this.sprite.vel.x = 0;
        this.sprite.vel.y = 0;

        let speedIncrease = 1.2;
        for(let otherBug of bugs){
          if (otherBug !== this && !otherBug.isKilled){
            otherBug.increaseSpeed(speedIncrease);
          }
        }
      }
   }

   update(){
    this.sprite.x += this.sprite.vel.x;
    this.sprite.y += this.sprite.vel.y;
   }

   increaseSpeed(increaseAmount){
    this.sprite.vel.x += Math.sign(this.sprite.vel.x) * increaseAmount;
   }
}