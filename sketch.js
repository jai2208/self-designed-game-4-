var PLAY = 1
var END = 0
var gameState = PLAY
var graveYardImg,graveYard;
var obstaclesGroup , obstacle1 , obstacle2 , obstacle3,obstacle4;
var primisImg,primis;
var invisibleGround;
var gameOverImg,gameOverSound,gameOver;
var restartImg,restart;

function preload(){
  //loading all images and sounds

  graveYardImg = loadImage("background2.png")

  obstacle1 = loadImage("obstacle 1.png");
  obstacle2 = loadImage("obstacle 2.png");
  obstacle3 = loadImage("obstacle 3.png");
  obstacle4 = loadImage("obstacle 4.png");

  primisImg = loadImage("primisCharacter.png")

  gameOverImg=loadImage("gameOver.png")
  gameOverSound = loadSound("gameOver.mp3")

  restartImg = loadImage("restart.png")
}

function setup() {
  createCanvas(820, 480);

//creating grave yard setting
  graveYard=createSprite(300,100)
  graveYard.addImage("graveYard",graveYardImg)
  graveYard.velocityX = -3

  //creating primis character
  primis = createSprite(150,290)
  primis.addImage("character",primisImg)
  primis.velocityX = 1
  primis.scale = 0.5
  
// creating invisible ground
  invisibleGround = createSprite(400,400,840,20)
  invisibleGround.visible = false;

  //creating obstacles group
 obstaclesGroup = new Group()

//creating game over sprite
  gameOver = createSprite(410,90) 
  gameOver.addImage("gameOver", gameOverImg)
  gameOver.scale = 0.5

  



primis.debug = true
primis.setCollider("rectangle",0,0,100,300)



 



}

function draw() {
  background(180);

if (gameState === PLAY)
{
  if(graveYard.x < 140)
  {
   graveYard.x = graveYard.width/2
  }  

  if(keyDown("space")&& primis.y >=200 )
{
   primis.velocityY = -7
  }

//adding gravity
primis.velocityY = primis.velocityY +0.15

spawnObstacles();

if(obstaclesGroup.isTouching(primis))
{
 
  primis.velocityY = -3;
  gameState = END
  gameOverSound.play();
}

gameOver.visible = false;

}


if (gameState === END)
{
 graveYard.velocityX = 0;
 primis.velocityY = 0;
 primis.velocityX = 0;
 obstaclesGroup.setLifetimeEach(-1)
 obstaclesGroup.setVelocityXEach(0);
 gameOver.visible = true; 



}




  



// making primis to collide with the in visible ground so he cannot fall off
primis.collide(invisibleGround);

// to draw the sprites on canvas
 drawSprites();
}

// spawing obstacles ofgame
function spawnObstacles()
{
  if (frameCount % 120 === 0){
    obstacle = createSprite(620,320,10,40);
    obstacle.velocityX = -3

     //generate random obstacles
     var rand = Math.round(random(1,4));
     switch(rand) {
       case 1: obstacle.addImage(obstacle1);
               break;
       case 2: obstacle.addImage(obstacle2);
               break;
       case 3: obstacle.addImage(obstacle3);
               break;
       case 4: obstacle.addImage(obstacle4);
               break;
     default:break      
              }
    // scaling and giving lifetime to obstacles          
    obstacle.scale = 1.0;
    obstacle.lifetime = 300;
   //add each obstacle to the group
   obstaclesGroup.add(obstacle);
    
  }
 }














