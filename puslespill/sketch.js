const KEY_W = 87
const KEY_A = 65
const KEY_S = 83
const KEY_D = 68
const KEY_K = 75
const KEY_L = 76

let boardSize = 300

let tile = boardSize / 3

let colorList = [
  'red', 
  'green', 
  'yellow', 
  'purple', 
  'blue', 
  'gray',
  'brown',
  'orange'
]

let board = [
  [],
  [],
  [],
]

function setup() {
  createCanvas(boardSize, boardSize);
}

class Player{  
  constructor(x, y) {
    this.x = x*tile
    this.y = y*tile
    this.vertical = false // retningen spilleren står i
  }

  drawPlayer() {
    noFill()
    stroke(255)
    strokeWeight(2)
    
    rect(this.x, this.y, tile)
    if (this.vertical){
      rect(this.x, this.y+tile, tile)
    }else {
      rect(this.x+tile, this.y, tile)
    }   
  }

  rotatePlayer() {
    this.vertical = !this.vertical
    this.movePlayer(0,0)
  }

  movePlayer(x, y) {
    this.x += x*tile
    this.y += y*tile

    if (this.vertical) {
      if (this.x < 0) {
        this.x = 0
      }else if (this.x > 2*tile){
        this.x = 2*tile
      }
      if (this.y < 0) {
        this.y = 0
      }else if (this.y > tile){
        this.y = tile
      }
    
    } else {
      if (this.x < 0) {
        this.x = 0
      }else if (this.x > tile){
        this.x = tile
      }
      if (this.y < 0) {
        this.y = 0
      }else if (this.y > 2*tile){
        this.y = 2*tile
      }
    }

    // console.log(this.x/tile, this.y/tile)
  }

}

let player = new Player(0,0)

function draw() {
  background(133, 100, 47);
  player.drawPlayer()
}

function keyPressed() {
  if (keyCode === UP_ARROW || keyCode === KEY_W) {
    player.movePlayer(0, -1)
  }
  if (keyCode === DOWN_ARROW || keyCode === KEY_S) {
    player.movePlayer(0, 1)
  }
  if (keyCode === LEFT_ARROW || keyCode === KEY_A) {
    player.movePlayer(-1, 0)
  }
  if (keyCode === RIGHT_ARROW || keyCode === KEY_D) {
    player.movePlayer(1, 0)
  }
  if (keyCode === KEY_L) {
    console.log("swap!")
  }
  if (keyCode === KEY_K) {
    player.rotatePlayer()
  }

}