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

function setup() {
  createCanvas(boardSize, boardSize);
  let assetsList = []
  for (let i = 1; i <= 8; i++) {
    // console.log(i)
    assetsList.push(loadImage('./assets/'+String(i)+'.png'))
  }
  console.log(assetsList)
}

class Piece{
  constructor(x, y, id, color) {
    this.x = x*tile
    this.y = y*tile 
    this.id = id 
    this.color = color 
  }

  drawPiece() {
    if (this.id > 0) {
      stroke(0)
      strokeWeight(1)
      fill(this.color)
      rect(this.x, this.y, tile)
    }
  }
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
let piece = new Piece(1, 1, 1, 'red')

let board = [
  [],
  [],
  [],
]

function draw() {
  background(133, 100, 47);
  piece.drawPiece()
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