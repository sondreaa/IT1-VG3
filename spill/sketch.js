const KEY_X = 88
const KEY_C = 67

var playerx = 250
var playery = 450
var player_rotation = 0

var ballx = 250
var bally = 250
var ballspeedx = 0
var ballspeedy = 300

var is_colliding = false

function setup() {
  createCanvas(500, 500);
  rectMode(CENTER)
  angleMode(DEGREES)
}

function player(){
  push()
  translate(playerx, playery)
  rotate(player_rotation);
  fill(color(0, 255, 0))
  rect(0, 0, 50, 10);
  fill(color(255))
  pop()
  
  if (keyIsDown(UP_ARROW)){
    playery -= 5
    if (playery <= 0)
      playery = 0
  }
  if (keyIsDown(DOWN_ARROW)){
    playery += 5
    if (playery >= 500)
      playery = 500
  }
  if (keyIsDown(LEFT_ARROW)){
    playerx -= 5
    if (playerx <= 0)
      playerx = 0
  }
  if (keyIsDown(RIGHT_ARROW)){
    playerx += 5
    if (playerx >= 500)
      playerx = 500
  }
  if (keyIsDown(KEY_C)) {
    player_rotation += 4
    if (player_rotation == 360)
      player_rotation = 0
  }
  if (keyIsDown(KEY_X)){
    player_rotation -= 4
    if (player_rotation == -360)
      player_rotation = 0
  }
}

function ball_rect_collision() {
  rot_ball_x = (ballx - playerx)*cos(player_rotation) + (bally - playery)*sin(player_rotation)
  rot_ball_y = -(ballx - playerx)*sin(player_rotation) + (bally - playery)*cos(player_rotation)
  distancex = abs(rot_ball_x);
  distancey = abs(rot_ball_y);

  if (distancex > (50/2 + 5)) { return false; }
  if (distancey > (10/2 + 5)) { return false; }

  if (distancex <= (50/2)) { return true; } 
  if (distancey <= (10/2)) { return true; }

  cornerDistance_sq = (distancex - 50/2)^2 +
                         (distancey - 10/2)^2;

  return (cornerDistance_sq <= (5^2));
}

function ball(){
  ballx += deltaTime*ballspeedx/1000
  bally += deltaTime*ballspeedy/1000
  circle(ballx, bally, 10)
  
  if (ballx >= 500){
    ballx = 500
    ballspeedx = -ballspeedx
  }
  if (ballx <= 0){
    ballx = 0
    ballspeedx = -ballspeedx
  }
  if (bally >= 500){
    bally = 500
    ballspeedy = -ballspeedy
  }
  if (bally <= 0){
    bally = 0
    ballspeedy = -ballspeedy
  }
  
  if (ball_rect_collision() && !is_colliding){
    ballangle = atan2(ballspeedy, ballspeedx)
    angle = 2*(player_rotation - ballangle)
    new_ballspeedx = ballspeedx*cos(angle) + -ballspeedy*sin(angle)
    new_ballspeedy = ballspeedx*sin(angle) + ballspeedy*cos(angle)
    ballspeedx = new_ballspeedx
    ballspeedy = new_ballspeedy
    is_colliding = true
  }
  if(!ball_rect_collision()) {
    is_colliding = false
  }
  
}

function ball_enemy_collision(enx, eny){
    distancex = abs(ballx - enx);
    distancey = abs(bally - eny);

    if (distancex > (25/2 + 5)) { return false; }
    if (distancey > (25/2 + 5)) { return false; }

    if (distancex <= (25/2)) { return true; } 
    if (distancey <= (25/2)) { return true; }

    cornerDistance_sq = (distancex - 25/2)^2 +
                         (distancey - 25/2)^2;

    return (cornerDistance_sq <= (5^2));
}

function enemy_rect_collision(enx, eny){
  rot_en_x = (enx - playerx)*cos(player_rotation) + (eny - playery)*sin(player_rotation)
  rot_en_y = -(enx - playerx)*sin(player_rotation) + (eny - playery)*cos(player_rotation)
  distancex = abs(rot_en_x);
  distancey = abs(rot_en_y);

  if (distancex > (50/2 + 25/2)) { return false; }
  if (distancey > (10/2 + 25/2)) { return false; }

  if (distancex <= (50/2)) { return true; } 
  if (distancey <= (10/2)) { return true; }

  cornerDistance_sq = (distancex - 50/2)^2 +
                         (distancey - 10/2)^2;

  return (cornerDistance_sq <= (5^2));
}

var xenemy1 = 50
var yenemy1 = 350
var enemy1_kill = false
var player_kill = false
function enemy1(){
  fill(color(255, 0, 0))
  rect(xenemy1, yenemy1, 25, 25)
  fill(color(255))
  
  if (xenemy1 < playerx){
    xenemy1 += 1/2
  }else{
    xenemy1 -= 1/2
  }
  if (yenemy1 < playery){
    yenemy1 += 1/2
  }else{
    yenemy1 -= 1/2
  }
  if (ball_enemy_collision(xenemy1, yenemy1)){
    enemy1_kill = true
  }
  if (enemy_rect_collision(xenemy1, yenemy1)){
    player_kill = true
  }
  
}

var xenemy2 = 50
var yenemy2 = 50
var a = 0
var enemy2_kill = false
function enemy2(){
  fill(color(255, 255, 0))
  rect(xenemy2, yenemy2, 25, 25)
  fill(color(255))
  
  if (a == 0)
    xenemy2 += 1
    if (xenemy2 >= 450)
      a = 1
  if (a == 1)
    xenemy2 -= 1
    if (xenemy2 <= 50)
      a = 0
  if (ball_enemy_collision(xenemy2, yenemy2))
    enemy2_kill = true
  if (enemy_rect_collision(xenemy2, yenemy2))
    player_kill = true
}

var xenemy3 = 400
var yenemy3 = 150
var xenemy3speed = 100
var yenemy3speed = 100
var enemy3_kill = false
function enemy3(){
  
  xenemy3 += deltaTime*xenemy3speed/1000
  yenemy3 += deltaTime*yenemy3speed/1000
  
  fill(color(255, 100, 0))
  rect(xenemy3, yenemy3, 25, 25)
  fill(color(255))
  
  
  if (xenemy3 >= 500){
    xenemy3 = 500
    xenemy3speed = random(-100, 100)
    yenemy3speed = random(-100, 100)
  }
  if (xenemy3 <= 0){
    xenemy3 = 0
    xenemy3speed = random(-100, 100)
    yenemy3speed = random(-100, 100)
  }
  if (yenemy3 >= 500){
    yenemy3 = 500
    xenemy3speed = random(-100, 100)
    yenemy3speed = random(-100, 100)
  }
  if (yenemy3 <= 0){
    yenemy3 = 0
    xenemy3speed = random(-100, 100)
    yenemy3speed = random(-100, 100)
  }
  
  if (ball_enemy_collision(xenemy3, yenemy3))
    enemy3_kill = true
  if (enemy_rect_collision(xenemy3, yenemy3))
    player_kill = true
}

function draw() {
  background(65, 49, 22); 
  if (player_kill == false){
    player()
  }else{
    textSize(32);
    fill(133, 100, 47)
    text('du er dau.', 180, 250);
  }
  if (enemy1_kill == false){
    enemy1()
  }
  if (enemy2_kill == false){
    enemy2()
  }
  if (enemy3_kill == false){
    enemy3()
  }
  if (enemy3_kill == true && enemy2_kill == true && enemy1_kill == true && player_kill == false){
    textSize(32);
    fill(133, 100, 47)
    text('du er flink.', 180, 250);
    
  }
  ball();
  
 
}

