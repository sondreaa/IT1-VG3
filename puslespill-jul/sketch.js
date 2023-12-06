const KEY_W = 87
const KEY_A = 65
const KEY_S = 83
const KEY_D = 68
const KEY_K = 75
const KEY_L = 76

let boardSize = 300

let tile = boardSize / 3

let assetsList = []
const puzzleFolder = "christmas/"

function setup() {
  createCanvas(boardSize, boardSize)
  for (let i = 1; i <= 9; i++) {
    // console.log(i)
    assetsList.push(loadImage('./assets/'+puzzleFolder+String(i)+'.png'))
  }
  // console.log(assetsList)
}

class Piece{
  constructor(x, y, id) {
    this.x = x*tile
    this.y = y*tile 
    this.id = id 
    this.img = assetsList[id]
  }

  drawPiece() {    
    this.img = assetsList[this.id]
    if (this.img){
      image(this.img, this.x, this.y, tile, tile)
    }
  }
  swapPiece(piece) {
    let a = piece.x
    
    piece.x = this.x

    this.x = a

    let b = piece.y
    
    piece.y = this.y

    this.y = b

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
    stroke(0, 255, 0)
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

let board = [
  [],
  [],
  [],
]

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const id_array = numbers.sort((a, b) => 0.5 - Math.random());
let counter = 0
for (let y = 0; y<3; y++) {
  for (let x = 0; x<3; x++) {

    board[x][y] = new Piece(x, y, id_array[counter])
    counter += 1
  }
}
// console.log(board)

function isCorrectOrder(board){
  let expectedId = 0
  for (let y = 0; y<3; y++) {
    for (let x = 0; x<3; x++) {
  
      if (board[x][y].id !== expectedId){
        return false
      }
      expectedId += 1
    }
  }
  // console.log("Done!")
  return true
}

function boardSwitchPlaces(x, y, vertical) {
  if (vertical) {
    board[x][y].swapPiece(board[x][y+1])

    // Finn referansene til de to elementene
    let førsteElement = board[x][y]
    let andreElement = board[x][y+1]

    // Lag en midlertidig variabel
    let temp = førsteElement;

    // Bytt plass på elementene
    board[x][y] = andreElement;
    board[x][y+1] = temp;
  } else {
    board[x][y].swapPiece(board[x+1][y])

    // Finn referansene til de to elementene
    let førsteElement = board[x][y]
    let andreElement = board[x+1][y]

    // Lag en midlertidig variabel
    let temp = førsteElement;

    // Bytt plass på elementene
    board[x][y] = andreElement;
    board[x+1][y] = temp;

  }
  
  // console.log(board)
}

function draw() {
  background(133, 100, 47);


  for (let y = 0; y<3; y++) {
    for (let x = 0; x<3; x++) {
      board[x][y].drawPiece()
    }
  }
  if (!isCorrectOrder(board)){
    player.drawPlayer()
  }
    

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
    boardSwitchPlaces(player.x/tile, player.y/tile, player.vertical)
  }
  if (keyCode === KEY_K) {
    player.rotatePlayer()
  }

  if (isCorrectOrder(board)){
    document.getElementById("win-text").style.visibility = "visible"
  }

}