Number.prototype.clamp = function(min, max) {
  return this < min ? min : (this > max ? max : this);
};

var gameview = function(){




var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var width = window.innerWidth;
var height = window.innerHeight;
var player_x = 1000;
var player_y = 600;
var player_jump = 2;
var money = 0;
var k_w = false;
var k_a = false;
var k_s = false;
var k_d = false;
var spacebar = false;
var player_w = 10;
var player_h = 10;
var player_color = "orange";
var player_maxspeed = 5;
var velx = 0;
var vely = 0;
var friction = .9;
var gravity = .5;
var keys = [];
var level = 1;
var door = [1350, 125, 40, 45];
var door2 = [200, 10, 40, 45]
var lava = [-10, 609,4000, 3200];
//[x, y, width, height]
//new variable


var plats = [];
var plats_1 = [ [100,400,100,20], 
  [200,200,100,20],
  [700, 170, 100, 20],
  [1300, 170, 100, 20],
  [1200, 105, 1000, 20],
  [1000, 600, 100, 20], 
  [400, 600, 100, 20]
];
var plats_2 = [
[1300, 170, 100, 20],
[1000, 600, 100, 20], 
[1400, 500, 100, 20],
[1100, 80, 100, 20],
[600, 200, 100, 20],
[200, 55, 100, 20],


];
var plats_3 = [
[1300, 170, 100, 20],


];
var img = document.getElementById("player");
canvas.width = width;
canvas.height = height;
//gempleh
(function update (){
  //keycheck
  //d
  if (keys[68]){
    if (velx < player_maxspeed){
      velx = velx+1;
    }
  }
  //a
  if (keys[65]){
    if (velx > -player_maxspeed){
      velx = velx-1;
    }
  }
  //s
  if (keys[83]){
  if (velx = player_maxspeed *2){
    }
  }
  //jump
  if (keys[32]){
    if(player_jump > 0 && vely >-5) {
      player_jump -= 1;
      vely = -player_maxspeed *2.7;

    }
  }  
  //Physics
  velx = velx * friction;
  vely = vely + gravity;
  player_x = player_x + velx;
  player_y = player_y + vely;
  //boundaries
  player_x=player_x.clamp(0, width - player_w);
  player_y=player_y.clamp(0, height - player_h);
  //ready to jump
if(player_y >=height - player_h){
  player_jump=2;
}
//platform collision
for(var i = 0;i<plats_1.length;i++){
var plat = plats_1[i];
  if (player_y < plat[1] + player_h){
    if (player_x + player_w > plat[0] && player_x < plat[0] + plat[2] && player_y + vely > plat[1] - player_h){
      if (vely > 0){
        player_y = player_y.clamp(-50,plat[1] - player_h)
        player_jump = 2
        vely = 0;
      }  
    }

  }
}
//door collision
if (level === 1) {
if((Math.abs(player_x - door[0]) < 20) && (Math.abs(player_y - door[1])<30)) {
  level++
player_x = 1000;
player_y = 590;
plats_1 = plats_2;
  }
}
 
if (level === 2) {
if((Math.abs(player_x - door2[0]) < 15) && (Math.abs(player_y - door2[1])<30)) {
  level++
player_x = 1000;
player_y = 590;
plats_2 = plats_3;
  }
    }
if (player_y > 600){
  player_x = 1000;
  player_y = 590;
  player_jump = 2;  
}
  //draw
  ctx.clearRect(0, 0, width, height);
//draw platforms
for(var i = 0;i<plats_1.length;i++){
ctx.fillStyle = "grey";
ctx.fillRect(plats_1[i][0],plats_1[i][1],plats_1[i][2],plats_1[i][3])



}
//door
if(level === 1){
ctx.fillStyle = "brown";
ctx.fillRect(door[0], door[1], door[2], door[3],)
}
if(level === 2){
ctx.fillStyle = "brown";
ctx.fillRect(door2[0], door2[1], door2[2], door2[3],)
}



  //ctx.fillStyle = player_color;
ctx.drawImage (player, player_x,player_y - 10);
 // ctx.fillRect(player_x, player_y, player_w, player_h);

//lava
ctx.fillStyle = "orange";
ctx.fillRect(lava[0], lava[1],lava[2],lava[3],)



  setTimeout(update, 1000 / 60);
}());





document.onkeydown = document.onkeyup = function(e) {
  keys[e.keyCode] = e.type === "keydown";
};
};

setTimeout(gameview, 1);
console.logs(player_y)