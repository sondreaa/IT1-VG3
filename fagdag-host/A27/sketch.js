//let navn = localStorage.getItem("navnIT1Afagdag")
let poeng = 0




const KEY_X = 88

let dHeight = 224*2
let dWidth = 256*2
let lose = false

function setup() {
  createCanvas(dWidth, dHeight)
  rectMode(CENTER)
  angleMode(DEGREES)
}

class Character {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
}

class Ball extends Character {
  constructor(x, y){
    super(x, y)
    this.live = true
    this.speed = 1
  }
  drawBall() {
    if (this.live){
      fill(color(155, 0, 0))
      circle(this.x, this.y, 15)
    }
  }
  moveBall() {

    if (this.y < 30){
      this.live = false
    } else{
      this.y -= 10*this.speed
      this.speed *= 0.975
    }
  }
  checkCollision(obj) {
    if (this.live && dist(this.x, this.y, obj.x, obj.y) < 20 && obj.hp > 0) {
      // console.log("hit")
      obj.hp -= 1
      this.live = false
    }
  }
}
let ballList = []


class Player extends Character{
  constructor(x, y){
    super(x, y)
  }
  drawPlayer() {
    fill(color(139, 69, 19))
    rect(this.x, this.y, 30, 15)
    fill(70)
    rect(this.x, this.y-6, 21, 35);
    
    if (lose) {
      fill('#3e5c20')
      rect(this.x, this.y, 30, 15)
      rect(this.x, this.y-6, 21, 35);

    }

  }
  movePlayer() {
    // if (keyIsDown(UP_ARROW)){
    //   this.y -= 5
    //   if (this.y <= 0) {
    //     this.y = 0
    //   }
    // }
    // if (keyIsDown(DOWN_ARROW)){
    //   this.y += 5
    //   if (this.y >= height) {
    //     this.y = height
    //   }
    // }
    if (keyIsDown(LEFT_ARROW)){
      this.x -= 3
      if (this.x <= 15) {
        this.x = 15
      }
    }
    if (keyIsDown(RIGHT_ARROW)){
      this.x += 3
      if (this.x >= width-15) {
        this.x = width-15
      }
    }
  }
  shoot() {    
    let newBall = new Ball(this.x, this.y-20)
    ballList.push(newBall)

  }
}

// 3e5c20 zombiefarge
class Zombie extends Character{
  constructor(x, y, hp, speed){
    super(x, y)
    this.hp = hp
    this.speed = speed
  }
  drawZombie(){
    let size
    fill('#3e5c20')

    if (this.hp >= 3){
      size = 25
    } else if (this.hp == 2){
      size = 20
    }else if (this.hp == 1){
      size = 15
      this.hp = 0
    }else{
      size = 0
    }
    if (this.hp > 0){
      rect(this.x, this.y, size, size)

    }
    
  }
  moveZombie() {
    if (this.y < 400){
      this.y += this.speed
    }
    if (this.y >= 350){
      //console.log("du tapte!")
      lose = true

    }
    if (this.hp <= 0){
      this.y = 0
    }
  }
}


let player = new Player(dWidth/2, 400)

let zombieList = []

function loadZombies(level){
  
  if (level == 1){
    for (let i = 0; i < 3; i++){
      zombieList.push(new Zombie(150+100*i, -20, 3, Math.random()+0.15) )
    }
  }else if (level == 2){
    for (let i = 0; i < 6; i++){
      zombieList.push(new Zombie(60+80*i, -20, 3, Math.random()+0.15) )
    }
  }else if (level == 3){
    for (let i = 0; i < 9; i++){
      zombieList.push(new Zombie(40+50*i, -20, 3, Math.random()+0.15) )
    }
  }
    
  
}

let level = 0
function draw() {
  background(color(100, 150, 80))
  noStroke()
  fill(color(130, 180, 110))
  rect(dWidth/2, 350, dWidth, 2 )
  stroke(0)

  for (let i = 0; i < ballList.length; i++){
    if (ballList[i].live){
      ballList[i].drawBall()
      ballList[i].moveBall()
      for (let j = 0; j < zombieList.length; j++){
        ballList[i].checkCollision(zombieList[j])

      }
      
    } else{
      ballList.splice(i, 1)
    }
  }
  for (let i = 0; i< zombieList.length; i++){
    if (zombieList[i].hp > 0){
      zombieList[i].drawZombie()
      zombieList[i].moveZombie()
    } else{
      zombieList.splice(i, 1)
    }
  }
    
  player.movePlayer()
  player.drawPlayer()

  if (zombieList.length == 0){
    if (level < 3){
      level +=1
      document.getElementById("gameround").innerHTML = "Runde: "+String(level)
      loadZombies(level)
    } else{
      document.getElementById("gameround").innerHTML = "Du vant! Gratulerer!  Du fikk "+String(level)+" poeng."
      document.getElementById("continue").style = "display:block;"
      
      if (localStorage.getItem("poengIT1Afagdag") !== null) {
        poeng = Number(localStorage.getItem("poengIT1Afagdag")) + level
        localStorage.setItem("poengIT1Afagdag",String(poeng))
      }
    }  
  }
  if (lose){
    for (let i = 0; i< zombieList.length; i++){
      zombieList[i].hp = 999
    }
    document.getElementById("gameround").innerHTML = "Zombiene tok deg! Du fikk "+String(level-1)+" poeng."
    document.getElementById("continue").style = "display:block;"

    if (localStorage.getItem("poengIT1Afagdag") !== null) {
      poeng = Number(localStorage.getItem("poengIT1Afagdag")) + level-1
      localStorage.setItem("poengIT1Afagdag",String(poeng))
    }
  }

}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    player.shoot()
  }

}

