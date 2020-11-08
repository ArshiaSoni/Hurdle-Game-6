class Game{
  constructor(){

  }

  getGameState(){
    database.ref('gameState').on('value', function(data){
      gameState = data.val();
      console.log(gameState);
      if(gameState == 0){
        player = new Player();
        player.getPlayerCount();

        form = new Form();
        form.display();
      }
    })

    runner1 = createSprite(55, height/2 - 120);
    runner1.addImage(runner1Img);
    runner1.scale = 0.5;
    // runner1.debug = true;
    runner1.setCollider("rectangle", 0 , 0)
    runner2 = createSprite(70, height - 150);
    runner2.addImage(runner2Img);
    runner2.scale = 0.51
    // runner2.debug = true;
    runner2.setCollider("rectangle", 0, 0)
    runners= [runner1, runner2];
  }

  updateGameState(state){
    database.ref('/').update({gameState: state})
  }
  
  play(){
    form.hide();
    Player.getPlayerInfo();

    var index = 0;
    var x= 50;
    var y = 100;
    var ySpacing = 50; 
    for(var plr in allPlayers){
       runners[index].collide(grounds[index]);
       grounds[index].x = runners[index].x
       runners[index].velocityY += 2;
       runners[index].velocityX = 16;
      
       player.xPos = runners[index].x
       player.yPos = runners[index].y
       player.updatePlayerInfo();

       if(index + 1 == player.index){
         runners[index].shapeColor = 'red';
         camera .position.x = runners[index].x
         if(keyWentDown('space') || touches.length > 0){
          runners[index].velocityY -= 25
          // touches[]:
        }
         if(obstacles !== undefined && runners !== undefined && obstacles[index].isTouching(runners[index])){
        gameState = 2;
      }
       }
       index++
       text(allPlayers[plr].name + "'s Score: " + Math.round(allPlayers[plr].xPos/4) ,
        allPlayers[plr].xPos - 100, ySpacing);
       ySpacing += 50 
    }
    this.spawnObstacles();
  }

  spawnObstacles(){
    if(frameCount % rand == 0){
      var obstacle1 = createSprite(runner1.x + width, ground1.y- 50, 50, 20);
      obstacle1.addImage(obstacleImg)
      obstacle1.scale = 0.35;
      obstacle1.lifetime = width/runner1.velocityX
      // obstacle1.debug = true;
      obstacle1.setCollider("rectangle", 0, 0)
      obstacle1group.add(obstacle1);
      //console.log(obstacle1.lifetime);
    }

    if(frameCount % rand == 0){
      var obstacle2 = createSprite(runner2.x + width, ground2.y- 70, 50, 20);
      obstacle2.addImage(obstacleImg)
      obstacle2.scale = 0.35;
      obstacle2.lifetime = width/runner2.velocityX
      // obstacle2.debug = true;
      obstacle2.setCollider("rectangle", 0, 0)
      obstacle2group.add(obstacle2);
    }

    obstacles = [obstacle1group, obstacle2group];
  }

  end(){
    //textSize(40)
    alert('gameOver', width/2, 100);
  }
}