const KEY_W = 87
const KEY_A = 65
const KEY_S = 83
const KEY_D = 68
const KEY_K = 75
const SPACEBAR = 32

let d_width = 600
let d_height = (3/4) * d_width

let tile = 36

let colorList = ['red', 'green', 'yellow', 'purple', 'blue', 'gray']



function setup() {
  createCanvas(600, 450)

}

class Parent {
  constructor(x, y) {
    this.x = x*tile
    this.y = y*tile
  }
  move(x, y) {
    this.x += x*tile
    this.y += y*tile
    if (this.x < 0) {
      this.x = 0
    } else if (this.x > tile*4) {
      this.x = tile*4
    }
    if (this.y < 0){
      this.y = 0
    } else if (this.y > tile*11) {
      this.y = tile*11
    }
  }
  
}

class Block extends Parent {
  constructor(x, y, color) {
    super(x, y)
    this.colorIndex = color
    this.color = colorList[color]
  }
  drawBlock() {
    // noStroke()
    stroke(0)
    strokeWeight(1)
    fill(this.color)
    rect(this.x, this.y, tile)
  }
  swapBlock(block) {
    let a = block.x
    
    block.x = this.x

    this.x = a

    let b = block.y
    
    block.y = this.y

    this.y = b

  }
}

class Player extends Parent {
  constructor(x, y) {
    super(x, y)
  }
  drawPlayer() {
    noFill()
    stroke(255)
		strokeWeight(2)
    
    rect(this.x, this.y, tile)
    rect(this.x+tile, this.y, tile)
  }

}

// 1: gjennomføre på et mye mindre brett først
// 2: bruke noe av samme logikk til å lage et "sliding puzzle"
//    flere vanskelighetsgrader, har alle riktig farge, tall i rekkefølge?
//    

let board = [
  [],
  [],
  [],
  [],
  [],
  [],
]
function boardSwitchPlaces(x, y) {
  board[x][y].swapBlock(board[x+1][y])

  // Finn referansene til de to elementene
  let førsteElement = board[x][y]
  let andreElement = board[x+1][y]

  // Lag en midlertidig variabel
  let temp = førsteElement;

  // Bytt plass på elementene
  board[x][y] = andreElement;
  board[x+1][y] = temp;
}
function boardBlockFall(x, y) {
  board[x][y].swapBlock(board[x][y+1])

  // Finn referansene til de to elementene
  let førsteElement = board[x][y]
  let andreElement = board[x][y+1]

  // Lag en midlertidig variabel
  let temp = førsteElement;

  // Bytt plass på elementene
  board[x][y] = andreElement;
  board[x][y+1] = temp;
}
function checkMatch() {
  for (let x = 1; x < 5; x++) {
  for (let y = 0; y < 12; y++) {
      if (board[x-1][y].colorIndex != 5 &&board[x-1][y].color == board[x][y].color && board[x+1][y].color == board[x][y].color){
        console.log("match!")
        
      }

    }
  }
}


let player = new Player(2, 5)
let block = new Block(3, 6, 2)
let block2 = new Block(4, 6, 3)

// generate board
for (let x = 0; x < 6; x++) {
  for (let y = 0; y < 12; y++) {
    board[x].push(new Block(x, y, Math.floor(Math.random()*6)))
  }
}
// console.log(board)


function draw() {
  translate(300-tile*3,10)

  // background(0,100,0)
  // clear()
  background(180)
  // block.drawBlock()
  // block2.drawBlock()

  for (let x = 0; x < 6; x++) {
    for (let y = 0; y < 12; y++) {

      board[x][y].drawBlock()

      if (y < 11 && board[x][y].colorIndex != 5 && board[x][y+1].colorIndex == 5) {
        boardBlockFall(x, y)
      }
    }
  }
  
  for (var x = 0; x < tile*6+1; x += tile) {
		for (var y = 0; y < tile*12+1; y += tile) {
			stroke(0)
			strokeWeight(1)
			line(x, 0, x, tile*12)
			line(0, y, tile*6, y)
		}
	}

  player.drawPlayer()
  checkMatch()

}

function keyPressed() {
  if (keyCode === UP_ARROW || keyCode === KEY_W) {
    player.move(0, -1)
  }
  if (keyCode === DOWN_ARROW || keyCode === KEY_S) {
    player.move(0, 1)
  }
  if (keyCode === LEFT_ARROW || keyCode === KEY_A) {
    player.move(-1, 0)
  }
  if (keyCode === RIGHT_ARROW || keyCode === KEY_D) {
    player.move(1, 0)
  }
  if (keyCode === SPACEBAR || keyCode === KEY_K) {
    // console.log('Swap!')
    // block.swapBlock(block2)

    
    // board[player.x/tile][player.y/tile].swapBlock(board[player.x/tile+1][player.y/tile])
    
  

    boardSwitchPlaces(player.x/tile, player.y/tile)
    // boardBlockFall()
  }

}
