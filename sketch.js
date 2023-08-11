var fundoImg, fundo;
var ufoImg, ufo;
var fogueteImg, foguete;
var coinImg, coin;
var explosaoImg, explosao; 

var coinGroup;
var ufoGroup;

var score = 0;
var life = 3;

var gameState = "play";

//carregar imagens
function preload() {
   fundoImg = loadImage("img/Ceu3.avif")
   ufoImg = loadImage("img/Cell Jr.png")
   fogueteImg = loadAnimation("img/Goku Voando.png")
   explosaoImg = loadAnimation("img/explosao.png")
   coinImg = loadImage("img/Esfera.png")
   

}


function setup() {
  createCanvas(800,600);

  //criar sprites
  fundo = createSprite(400,80)
  fundo.addImage(fundoImg)
  fundo.scale=1.5


 foguete = createSprite(400,500)
 foguete.addAnimation("Goku Voando", fogueteImg)
 foguete.addAnimation("explosão", explosaoImg)
 foguete.scale = 0.2



 coinGroup = new Group()
 ufoGroup = new Group()
}

function draw() {
  background(0);

  drawSprites();

  textSize(25)
  fill("black")
  text("Vidas: " + life, 60,100) 

  textSize(25)
  fill("black")
  text("Score: " + score, 60,70)
  
  //criar estado de jogo "play"
  if (gameState == "play") {
     fundo.velocityY = 4;

     if (fundo.y > 800) {
       fundo.y = 400
     }
     if (keyDown("RIGHT_ARROW")) {
        foguete.x += 5;
     }
     if (keyDown("LEFT_ARROW")) {
        foguete.x -= 5;
     }
     if (keyDown("UP_ARROW")) {
        foguete.y -= 5;
     }
     if (keyDown("DOWN_ARROW")) {
        foguete.y += 5;
     }
     removeLife()
     removeCoins()
     spawnAliens()
     spawnCoins()

     if (life == 0) {
       gameState = "end"
     }
  }


  //criar estado de jogo "end"
  if (gameState == "end") {
    coinGroup.destroyEach()
    ufoGroup.destroyEach()

    fundo.velocityY = 0
    foguete.velocityX = 0

    foguete.changeAnimation("explosao", explosaoImg)
    textSize(30)
    fill("orange") 
    text("Game Over!", 300, 400)
  }
  
}

function spawnAliens() {
  if (frameCount % 60 == 0) {
    ufo = createSprite(random(30,770), random(10,450))
    ufo.addImage(ufoImg)
    ufo.velocityY = 3
    ufo.scale = 0.2

    ufo.lifeTime = 800
    ufoGroup.add(ufo)
  }
}

function spawnCoins() {
  if (frameCount % 60 == 0) {
    coin = createSprite(random(30,790), random(10,550))
    coin.addImage(coinImg)
    coin.velocityY = 2
    coin.scale = 0.1

    coin.lifeTime = 800
    coinGroup.add(coin)
  }
  
 
}

function removeCoins() {
  foguete.overlap(coinGroup, function(collector, collected){
    score += 1;
    collected.remove();
  });
}

function removeLife() {
  foguete.overlap(ufoGroup, function(collector, collected){
    life -= 1;
    collected.remove();
  })
  
 }