/*-------------------------------- Constants --------------------------------*/

const speed = 70

const cellCount = 625

const numberOfColumns = 25

const numberOfRows = 25

const leftCell = [0, 25, 50, 75, 100, 125, 150, 175, 200, 225, 250, 275, 300, 325, 350, 375, 400, 425, 450, 475, 500, 525, 550, 575, 600]

const rightCell = [24, 49, 74, 99, 124, 149, 174, 199, 224, 249, 274, 299, 324, 349, 374, 399, 424, 449, 474, 499, 524, 549, 574, 599, 624]

const saveHighScore = "high-score"

const myStorage = window.localStorage

/*-------------------------------- Variables --------------------------------*/

let playGame, startUp, startDown, startLeft, startRight, score, highScore, cell, snakeColor, pickupColor, snakeTop, newTop, snakeDirection, change

let snake = []

let board = []

/*------------------------ Cached Element References ------------------------*/

const gameArea = document.querySelector(".board")

const currentScore = document.querySelector("#current")

const highestScore = document.querySelector("#highest")

const gameStatus = document.querySelector(".message")

const restartBtn = document.getElementById("restart")

const body = document.querySelector("body")

const lightDarkBtn = document.querySelector("#light-dark-button") 

const up = document.getElementById("up")

const left = document.getElementById("left")

const down = document.getElementById("down")

const right = document.getElementById("right")

/*----------------------------- Event Listeners -----------------------------*/

// onclick (to move up on virtual keypad)
up.addEventListener("click", keypadMovement)

// onclick (to move left on virtual keypad)
left.addEventListener("click", keypadMovement)

// onclick (to move down on virtual keypad)
down.addEventListener("click", keypadMovement)

// onclick (to move right on virtual keypad)
right.addEventListener("click", keypadMovement)

// keydown (for movement via keyboard)
document.addEventListener('keydown', arrowMovement)

// restart (to reset game on click)
restartBtn.addEventListener("click", restart)

// keydown (for restart via keyboard)
document.addEventListener('keydown', restartWithKeyPress) 

// light/dark mode
lightDarkBtn.addEventListener("click", toggleLightDark)

/*-------------------------------- Functions --------------------------------*/

highScore = ""
localStorage.setItem("high-score", highScore)
gameBoard()
init()

// Start & restart game settings
function init(){
  score = 0
  currentScore.textContent = `Current Score: ${score}`
  highScore = localStorage.getItem(saveHighScore)
  highestScore.textContent = `Highest Score: ${highScore}`
  playGame = true
  snake = [107, 106, 105]
  pickup = 393
  snakeColor = "green"
  pickupColor = "purple"
  snakeTop = snake[0]
  snakeDirection = null
  
  clearCells()
  getSnake()
  getPickup()
  render()
  }

// Mid-game graphical adjustments
function render(){
  getSnake()
  if (pickup === snakeTop){
    snake.push(snake[snake.length - 1])
    score += 1
    currentScore.textContent = `Current Score: ${score}`
    highestScore.textContent = `Highest Score: ${highScore}`
    newPickup()
    getPickup()
  }

}

// Creating a gameBoard via the DOM based off variable cellCount
function gameBoard(){
  for (let i = 0; i < cellCount; i++){
    // on each iteration, create a new cell with these attributes
    let cell = document.createElement("div")
    cell.setAttribute("class", "cell")
    cell.setAttribute("id", `${i}`)
    // append each created cell to cached board reference
    gameArea.appendChild(cell)
    // create the board game state variable by pushing each id through to board array
    board.push(document.getElementById(i))
  }
}

// Creating each snake cell via the DOM
function getSnake(){
  snake.forEach((el) => {
    const snakeStyle = board[el].style
      snakeStyle.backgroundColor = snakeColor
      snakeStyle.opacity = "1"
      snakeStyle.borderRadius = "7px"
      snakeStyle.border = "1px solid lightgreen"
  })
}

// Sets the styling for empty cells
function clearCells(){
  board.forEach((el) => {
    el.style.backgroundColor = "rgb(116, 116, 116)"
    el.style.opacity = "0.2"
    el.style.borderRadius = "0"
    el.style.border = "1px solid #1d1e2b"
  })
}

// Creating pickup via the DOM
function getPickup(){
  const pickupStyle = board[pickup].style
    pickupStyle.opacity = "1"
    pickupStyle.backgroundColor = pickupColor
    pickupStyle.borderRadius = "20px"
    pickupStyle.border = "1px solid pink"
}

// Creating new snake top after position changes
function newSnakeTop(){
  newTop = snakeTop + change
  snake.unshift(newTop)
  snake.pop()
  snakeTop = snake[0]
}

// Generates new pickup at random on the game board
function newPickup(){
  pickup = Math.floor(Math.random() * cellCount)
  if (snake.some(index => index === pickup)){
    newPickup()
  }
}


// Arrow key event listeners for snake movement
function arrowMovement(evt){  
  // When ArrowUp is pressed, move snake up
  if (evt.key === 'ArrowUp' && snakeDirection !== "down") {
    clearInterval(startUp)
    clearInterval(startLeft)
    clearInterval(startRight)
    // comparing positional change to occur vs. spaces available
    if (playGame === true){
      startUp = setInterval(() => {
      
      if (snakeTop - numberOfColumns >= 0 && !snake.some((el => el === snakeTop - numberOfColumns))) {
        // set variable snakeDirection to later determine where new snake pickups should be attached to
        snakeDirection = "up"
        change = -numberOfColumns

        newSnakeTop()
        clearCells()
        getSnake()
        getPickup()
        render()
      }
        else{
          lose()
      }
    }, speed)
  }
}

  // When ArrowDown is pressed, move snake down
  if (evt.key === 'ArrowDown' && snakeDirection !== "up") {
    // comparing positional change to occur vs. spaces available
    clearInterval(startDown)
    clearInterval(startLeft)
    clearInterval(startRight)
    if (playGame === true){
      startDown = setInterval(() => {
      
        if (snakeTop + numberOfColumns <= (numberOfRows * numberOfColumns) - 1 && !snake.some((el => el === snakeTop + numberOfColumns))) {
        // set variable snakeDirection to later determine where new snake pickups should be attached to
        snakeDirection = "down"
        change = numberOfColumns
      
        newSnakeTop()
        clearCells()
        getSnake()
        getPickup()
        render()
      }
        else {
          lose()
        }
      }, speed)
    }
  }
  // When ArrowLeft is pressed, move snake left
  if (evt.key === 'ArrowLeft' && snakeDirection !== "right" && snakeDirection !== null) {
    // comparing positional change to occur vs. spaces available
    clearInterval(startUp)
    clearInterval(startDown)
    clearInterval(startLeft)
    if (playGame === true){
      startLeft = setInterval(() => {
      
      if (snakeTop - 1 >= 0 && !leftCell.includes(snakeTop) && !snake.some((el => el === snakeTop - 1))){
        // set variable snakeDirection to later determine where new snake pickups should be attached to
        snakeDirection = "left"
        change = -1

        newSnakeTop()
        clearCells()
        getSnake()
        getPickup()
        render()
      }
        else{
          lose()
        }
      }, speed)
    }
  }
    
  // When ArrowRight is pressed, move snake right
  if (evt.key === 'ArrowRight' && snakeDirection !== "left") {
    // comparing positional change to occur vs. spaces available
    clearInterval(startUp)
    clearInterval(startDown)
    clearInterval(startRight)
      if (playGame === true){
        startRight = setInterval(() => {
        
        if (snakeTop + 1 <= (numberOfRows * numberOfColumns) - 1 && !rightCell.includes(snakeTop) && !snake.some((el => el === snakeTop + 1))){
          // set variable snakeDirection to later determine where new snake pickups should be attached to
          snakeDirection = "right"
          change = 1

          newSnakeTop()
          clearCells()
          getSnake()
          getPickup()
          render()
        }
        else{
          lose()
        }
      }, speed)
    }
  }
}

// Virtual keypad click event listeners for snake movement
function keypadMovement(evt){  
  // When up arrow on keypad is clicked, move snake up
  if (evt.target.id === 'up' && snakeDirection !== "down") {
    clearInterval(startUp)
    clearInterval(startLeft)
    clearInterval(startRight)
    // comparing positional change to occur vs. spaces available
    if (playGame === true){
      startUp = setInterval(() => {
      
      if (snakeTop - numberOfColumns >= 0 && !snake.some((el => el === snakeTop - numberOfColumns))) {
        // set variable snakeDirection to later determine where new snake pickups should be attached to
        snakeDirection = "up"
        change = -numberOfColumns

        newSnakeTop()
        clearCells()
        getSnake()
        getPickup()
        render()
      }
        else{
          lose()
      }
    }, speed)
  }
}

  // When down arrow on keypad is clicked, move snake down
  if (evt.target.id === 'down' && snakeDirection !== "up") {
    // comparing positional change to occur vs. spaces available
    clearInterval(startDown)
    clearInterval(startLeft)
    clearInterval(startRight)
    if (playGame === true){
      startDown = setInterval(() => {
      
        if (snakeTop + numberOfColumns <= (numberOfRows * numberOfColumns) - 1 && !snake.some((el => el === snakeTop + numberOfColumns))) {
        // set variable snakeDirection to later determine where new snake pickups should be attached to
        snakeDirection = "down"
        change = numberOfColumns
      
        newSnakeTop()
        clearCells()
        getSnake()
        getPickup()
        render()
      }
        else {
          lose()
        }
      }, speed)
    }
  }
  // When left arrow on keypad is clicked, move snake left
  if (evt.target.id === 'left' && snakeDirection !== "right" && snakeDirection !== null) {
    // comparing positional change to occur vs. spaces available
    clearInterval(startUp)
    clearInterval(startDown)
    clearInterval(startLeft)
    if (playGame === true){
      startLeft = setInterval(() => {
      
      if (snakeTop - 1 >= 0 && !leftCell.includes(snakeTop) && !snake.some((el => el === snakeTop - 1))){
        // set variable snakeDirection to later determine where new snake pickups should be attached to
        snakeDirection = "left"
        change = -1

        newSnakeTop()
        clearCells()
        getSnake()
        getPickup()
        render()
      }
        else{
          lose()
        }
      }, speed)
    }
  }
    
  // When right arrow on keypad is clicked, move snake right
  if (evt.target.id === 'right' && snakeDirection !== "left") {
    // comparing positional change to occur vs. spaces available
    clearInterval(startUp)
    clearInterval(startDown)
    clearInterval(startRight)
      if (playGame === true){
        startRight = setInterval(() => {
        
        if (snakeTop + 1 <= (numberOfRows * numberOfColumns) - 1 && !rightCell.includes(snakeTop) && !snake.some((el => el === snakeTop + 1))){
          // set variable snakeDirection to later determine where new snake pickups should be attached to
          snakeDirection = "right"
          change = 1

          newSnakeTop()
          clearCells()
          getSnake()
          getPickup()
          render()
        }
        else{
          lose()
        }
      }, speed)
    }
  }
}

// Ran on game end either by wall or body crash
function lose(){
  clearInterval(startUp)
  clearInterval(startDown)
  clearInterval(startLeft)
  clearInterval(startRight)
  alert("Game over. Press Space or the 'Restart Game' button to try again!")
  getHighScore()
  playGame = false
}

// High score functionality
function getHighScore(){
    if (score > highScore) {
      highScore = score
      localStorage.setItem("high-score", highScore)
      highestScore.textContent = `Highest Score: ${highScore}`     
    } else{
      localStorage.setItem("high-score", highScore);
      highestScore.textContent = `Highest Score: ${highScore}` 
    }
  }

// Restart functionality both on click & key press
function restart(){
  clearInterval(startUp)
  clearInterval(startDown)
  clearInterval(startLeft)
  clearInterval(startRight)
  playGame = false
  init()
}

// Restart game by pressing "space" key
function restartWithKeyPress(evt){
  if (evt.key === ' '){
    restart()
  }
}

// Light and dark mode functionality
function toggleLightDark() {
  body.className = body.className === "dark" ? "" : "dark"
}

// Checking if the user has pre-established color scheme preference
function checkDarkPref() {
  if (
    window.matchMedia("(prefers-color-scheme:dark)").matches &&
    body.className !== "dark"
  ) {
    toggleLightDark()
  }
}

checkDarkPref()






