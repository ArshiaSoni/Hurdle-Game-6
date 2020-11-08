var database;
var gameState, playerCount;
var game, player, form;
var allPlayers;
var runner1, runner2, runners;
var ground1, ground2, grounds;
var obstacle1group, obstacle2group, obstacles;
var trackImg, runner1Img, runner2Img, obstacleImg;
var rand;

function preload(){

  trackImg = loadImage("olympic.jpg");
  runner1Img = loadImage("running1.png");
  runner2Img = loadImage("running2.png");
  obstacleImg = loadImage("hurdle1.png")

}
function setup(){
  createCanvas(windowWidth, windowHeight);

  database = firebase.database();
  console.log(database);
  ground1 = createSprite(width/2, height/2 + 25 , width, 20);
  ground1.visible = false;
  ground2 = createSprite(width/2, height-25, width, 20);
  ground2.visible = false;

  grounds = [ground1, ground2];

  game = new Game();
  game.getGameState();

  resetButton = createButton('reset');
  resetButton.position(10,10)

  obstacle1group = new Group();
  obstacle2group = new Group();

  rand = Math.round(random(150, 200));
  console.log(rand);
}

function draw(){
  background(trackImg);

  if(playerCount == 2){
    gameState = 1;
    game.updateGameState(1);
  }

  if(gameState==1){
    game.play();
  }

  if(gameState == 2){
    game.end();
  }

  resetButton.mousePressed(function(){
    game.updateGameState(0);
    player.updatePlayerCount(0);

    database.ref('players').remove();
  })

  drawSprites();
}