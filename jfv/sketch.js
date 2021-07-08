var backImage,backgr;
var player, player_running;
var ground,ground_img,stone,stoneImg,furit,fruitImg;
var furitG,stoneG;
var score=0;

var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  stoneImg=loadImage("stone.png");
  furitImg=loadImage("banana.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
  furitG=new Group();
  stoneG=new Group();
}

function draw() { 
  background(0);

  if(gameState===PLAY){
    spawnBanana()
    spawnStone()
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
    
    player.collide(ground);
    if(furitG.isTouching(player)){
      player.scale=player.scale+0.01
      furitG.destroyEach(furit);
      score=score+1;
    }
    if(stoneG.isTouching(player)&&player.scale==0.1){
      player.destroy()
       gameState=END

   }
    if(stoneG.isTouching(player)){
      player.scale=0.1
      score=score-1;
      stoneG.destroyEach()
    }
   
    
  }
  if(gameState===END){
    
    furit.velocityX=0;
    stone.velocityX=0;
    backgr.velocityX=0;
    
  }
  drawSprites();
  text("scoer :"+score,350,10)
  
  }



function spawnBanana(){
if (frameCount % 175 == 0){
  furit=createSprite(800,random(120,350),10,10)
  furit.addImage( "furit", furitImg)
  furit.scale=0.05
  furit.velocityX=-4
  furitG.add(furit)
  furitG.lifeTime=200
}
}
function spawnStone(){
  if (frameCount%200==0){
    stone=createSprite(800,340,10,10)
    stone.addImage("SSS",stoneImg)
    stone.velocityX=-4
    stone.scale=random(0.1,0.5)
    stoneG.add(stone)
    stone.debug=true
    
  }
}
