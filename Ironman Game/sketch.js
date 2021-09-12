var score

function preload() {
  //load game assets
 ironman = loadImage('images/iron.png')
 bg = loadImage('https://cdn.pixabay.com/photo/2019/01/02/10/05/background-3908459_1280.jpg')
 stoneImage = loadImage("https://cdn.pixabay.com/photo/2014/12/22/00/03/rock-576668_1280.png")
 diamondImage = loadImage("https://cdn.pixabay.com/photo/2014/04/03/10/21/diamond-310191_1280.png")
}


function setup() {

  // creating canvas and background
  createCanvas(600,600);
  background = createSprite(300,300,600,600) 
  
  // creating player with correct size
  player = createSprite(100,550,40,40);
  player.scale = 0.2
  player.debug = true

  // creatinng stoneGroup
  stonegroup = new Group()

  // creating diamondGroup
  diamondgroup = new Group()

}

function draw() {

  // adding images to background and player
  background.addImage(bg)
  player.addImage(ironman)

  // giving velocity to background
  background.velocityY = 3

  // creating commands for player to move
  if(keyDown("up")){
    player.y=player.y-3;
  }
  if(keyDown("down")){
    player.y=player.y+3;
  }
  if(keyDown("left")){
    player.x=player.x-3;
  }
  if(keyDown("right")){
    player.x=player.x+3;
  }

  // repeating background
  if(background.y>300){
    background.y = 280
}


// able to restart the game if player is touching stones
if(player.isTouching(stonegroup)){
  text("YOU LOOSE",200,200)
  player.x=100;
  player.y=550
}


// calling back function to create stones and diamonds
generatediamonds()
generatestones()


// allowing player to touch diamonds to increase the score 
for(var i=0; i<(diamondgroup).length; i++){
  var diamond=diamondgroup.get(i);
  if(diamond.isTouching(player)){
     diamond.destroy()
      score++
  }
}

  drawSprites()
}


// resizing of text
textSize(20)
fill("red")
text("Coin Collected"+score,500,50)


// creating function to generate stones
function generatestones(){
if(frameCount % 100 === 0){
  var stone = createSprite(random(200,500),0,1,5)
  stone.scale = 0.05
  stone.velocityY = random(1,5)
  stone.addImage(stoneImage)
  stonegroup.add(stone)
}
}


// creating function to generate diamonds
function generatediamonds(){
  if(frameCount % 70 === 0){
    var diamond = createSprite(600,random(200,500))
    diamond.scale = 0.05
    diamond.velocityX = random(-1,-5)
    diamond.addImage(diamondImage)
    diamondgroup.add(diamond)
  }
  }
