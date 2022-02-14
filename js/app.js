/*-------------------------------- Constants --------------------------------*/

const speed = 150;
/*-------------------------------- Variables --------------------------------*/

let win, lose, playGame, stopGame, currentScore, highScore, snakeColor, pickupColor, snakeDirection, newPickup, cell

let snake = []

let board = [] // (will be full of null squares with one square holding the value the pickup will be assigned to)

let cellCount = 625

/*------------------------ Cached Element References ------------------------*/

const gameArea = document.querySelector(".board")

// const gameStatus = document.querySelector(".message")

const restartBtn = document.getElementById("restart")

const body = document.querySelector("body")

const lightDarkBtn = document.querySelector("#light-dark-button")

const myStorage = window.localStorage 

/*----------------------------- Event Listeners -----------------------------*/

// onclick (for movement on virtual keypad)

// restart (to reset game)
restartBtn.addEventListener("click", init)

// light/dark mode
lightDarkBtn.addEventListener("click", toggleLightDark)

// // keydown (for movement via keyboard)
// document.addEventListener('keydown', arrowMovement)

/*-------------------------------- Functions --------------------------------*/

// init(), play(), render(), currentScore(), highScore(), musicChange(), backgroundChange(), changeSnakeColor(), changePickupColor()

/**************************************** User Stories *******************************************/

// AAU I want to pick the color of my snake

// AAU I want to pick the color/theme of snake pickups

// AAU I want the option to either click on a virtual keypad or to press keys to move (virtual keypad allows mobile usability)

// AAU I want to only have to click the keyboard once per direction change (no holding or mashing keys)

// AAU I want to see my current score during game

// AAU I want to track high score in-game with an icon (ex. trophy with 35 next to it)

// AAU I want to be able to mute/unmute background music


/**************************************** PSEUDOCODE *********************************************/

// User win condition is achieving a new high score. Loss condition is reached when user crashes into barrier (either wall or its own body)

// Game will start on "key down" and listen for any key down events to navigate the game board

// Implement timer to determine "speed" of movement? (meaning tiny delay in milliseconds to execute move functions will make the shift in "snake body" div across the game board's squares appear as movement

// Snake should move at a constant speed & be immediately responsive to key changes

// Snake pickups should appear in random spots on the board

// Upon the snake being at the same location of the pickup, add +1 starting div to end of snake

// // Within the play function, when user crashes into wall or its own body, end the game

// Within the render function, score-dependent popups via if statements (i.e. small confetti for a score of 10, fireworks for a score of 30)

// Within the render function, change music based off higher score thresholds via if statements (example: calmer music in lower scores -> more intense music as score gets higher)

// Within the render function, possibility to change background color theme/flashing colors to emphasize intensity in concert with music changes

// Point total should be sum of total snake pickups

// Highest score should remain on screen indefinitely even upon user resetting the game (only current score should reset)

// Set a variable snakeIndex so that each arrow listener will just reference that variable, and not need to loop through the board each time before






init()

function init(){
  currentScore = 0
  highScore = null
  playGame = true
  stopGame = false
  snake = [105, 106, 107]
  pickup = 393
  snakeColor = "green"
  pickupColor = "red"

  gameBoard()
  getSnake()
  getPickup()

  }











// Creating a gameBoard via the DOM based off variable cellCount
function gameBoard(){
  for (let i = 0; i < cellCount; i++){
    let cell = document.createElement("div")
    cell.setAttribute("class", "cell")
    cell.setAttribute("id", `${i}`)
    // creating visual board via the DOM
    gameArea.appendChild(cell)
    // create the board game state variable by pushing each id through to board array
    board.push(document.getElementById(i))
  }
}
console.log(board)

// Creating each snake cell via the DOM
function getSnake(){
  snake.forEach((el) => {
    const snakeStyle = board[el].style
      snakeStyle.backgroundColor = snakeColor
      snakeStyle.opacity = 100
      snakeStyle.borderRadius = "7px"
      snakeStyle.border = "1px solid lightgreen"
  })
}
console.log(snake)

// Creating pickup via the DOM
function getPickup(){
  const pickupStyle = board[pickup].style
    pickupStyle.opacity = 100
    pickupStyle.backgroundColor = pickupColor
    pickupStyle.borderRadius = "20px"
    pickupStyle.border = "1px solid pink"
}






// function newPickup(){
//   newPickup = Math.floor(Math.random() * cellCount)
//   if (snake.some(index => index === pickup)){
//     newPickup()
//   }
// }


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

// // Arrow key event listeners for snake movement
// function arrowMovement(evt){  
//   // When ArrowUp is pressed, move snake up
//   if (evt.key === 'ArrowUp' && snakeDirection !== "down") {
//     // comparing positional change to occur vs. spaces available
//     if (snakeIndex - numberOfColumns >= 0){
//       // adjust board array to reflect value change in previous and current snake square
//       board[snakeIndex] = null
//       board[snakeIndex - numberOfColumns] = "snake"
//       // set variable snakeDirection to later determine where new snake pickups should be attached to
//       snakeDirection = "up"
//       // snakeIndex is adjusted to the new position after change
//       snakeIndex -= numberOfColumns
//       console.log(snakeIndex)
//       render()
//     }
//       else{
//         lose()
//     }
//   }
//   // When ArrowDown is pressed, move snake down
//   if (evt.key === 'ArrowDown' && snakeDirection !== "up") {
//     // comparing positional change to occur vs. spaces available
//     if (snakeIndex + numberOfColumns <= (numberOfRows * numberOfColumns) - 1){
//       // adjust board array to reflect value change in previous and current snake square
//       board[snakeIndex] = null
//       board[snakeIndex + numberOfColumns] = "snake"
//       // set variable snakeDirection to later determine where new snake pickups should be attached to
//       snakeDirection = "down"
//       // snakeIndex is adjusted to the new position after change
//       snakeIndex += numberOfColumns
//       snakeBody.pop()
//       snakeBody.unshift(snakeIndex += numberOfColumns)

//       console.log(snakeIndex)
//       console.log(snakeBody.pop())
//       console.log(snakeBody.unshift(snakeIndex += numberOfColumns))

//       render()
//     }
//     else{
//       lose()
//     }
//   }
//   // When ArrowLeft is pressed, move snake left
//   if (evt.key === 'ArrowLeft' && snakeDirection !== "right") {
//     // comparing positional change to occur vs. spaces available
//     if (snakeIndex - 1 >= 0 && !leftCell.includes(snakeIndex)){
//       // adjust board array to reflect value change in previous and current snake square
//       board[snakeIndex] = null
//       board[snakeIndex - 1] = "snake"
//       // set variable snakeDirection to later determine where new snake pickups should be attached to
//       snakeDirection = "left"
//       // snakeIndex is adjusted to the new position after change
//       snakeIndex -= 1
//       // remove previous snakeHead value and replace with new one
//       snakeHead.pop()
//       snakeHead.unshift(snakeIndex - 1)


//       console.log(snakeIndex)
//       console.log(snakeBody.pop())
//       console.log(snakeBody.unshift(snakeIndex += numberOfColumns))
//       render()
//     }
//     else{
//       lose()
//     }
//   }
//   // When ArrowRight is pressed, move snake right
//   if (evt.key === 'ArrowRight' && snakeDirection !== "left") {
//     // comparing positional change to occur vs. spaces available
//     if (snakeIndex + 1 <= (numberOfRows * numberOfColumns) - 1 && !rightCell.includes(snakeIndex)){
//       // adjust board array to reflect value change in previous and current snake square
//       board[snakeIndex] = null
//       board[snakeIndex + 1] = "snake"
//       // set variable snakeDirection to later determine where new snake pickups should be attached to
//       snakeDirection = "right"
//       // snakeIndex is adjusted to the new position after change
//       snakeIndex += 1
//       console.log(snakeIndex)
//       render()
//     }
//     else{
//       lose()
//     }
//   }
// }


// /*-------------------------------- Constants --------------------------------*/

// const speed = 150;

// const numberOfRows = 10

// const numberOfColumns = 12

// const leftCell = [0, 12, 24, 36, 48, 60, 72, 84, 96, 108]

// const rightCell = [11, 23, 35, 47, 59, 71, 83, 95, 107, 119]

// /*-------------------------------- Variables --------------------------------*/

// let win, lose, playGame, stopGame, currentScore, highScore, snakeColor, pickupColor, snakeDirection, snakeIndex, pickupIndex

// let snakeBody = []

// let board = [] // (will be full of null squares with one square holding the value the pickup will be assigned to)

// /*------------------------ Cached Element References ------------------------*/

// const allCells = document.querySelectorAll(".cell")

// const snake = document.querySelector(".snake")

// const pickup = document.querySelector(".pickup")

// // const gameStatus = document.querySelector(".message")

// const restartBtn = document.getElementById("restart")

// const body = document.querySelector("body")

// const lightDarkBtn = document.querySelector("#light-dark-button")

// const myStorage = window.localStorage 

// /*----------------------------- Event Listeners -----------------------------*/

// // onclick (for movement on virtual keypad)

// // restart (to reset game)
// restartBtn.addEventListener("click", init)

// // light/dark mode
// lightDarkBtn.addEventListener("click", toggleLightDark)

// // keydown (for movement via keyboard)
// document.addEventListener('keydown', arrowMovement)

// /*-------------------------------- Functions --------------------------------*/

// // init(), play(), render(), currentScore(), highScore(), musicChange(), backgroundChange(), changeSnakeColor(), changePickupColor()

// /**************************************** User Stories *******************************************/

// // AAU I want to pick the color of my snake

// // AAU I want to pick the color/theme of snake pickups

// // AAU I want the option to either click on a virtual keypad or to press keys to move (virtual keypad allows mobile usability)

// // AAU I want to only have to click the keyboard once per direction change (no holding or mashing keys)

// // AAU I want to see my current score during game

// // AAU I want to track high score in-game with an icon (ex. trophy with 35 next to it)

// // AAU I want to be able to mute/unmute background music


// /**************************************** PSEUDOCODE *********************************************/

// // User win condition is achieving a new high score. Loss condition is reached when user crashes into barrier (either wall or its own body)

// // Game will start on "key down" and listen for any key down events to navigate the game board

// // Implement timer to determine "speed" of movement? (meaning tiny delay in milliseconds to execute move functions will make the shift in "snake body" div across the game board's squares appear as movement

// // Snake should move at a constant speed & be immediately responsive to key changes

// // Snake pickups should appear in random spots on the board

// // Upon the snake being at the same location of the pickup, add +1 starting div to end of snake

// // // Within the play function, when user crashes into wall or its own body, end the game

// // Within the render function, score-dependent popups via if statements (i.e. small confetti for a score of 10, fireworks for a score of 30)

// // Within the render function, change music based off higher score thresholds via if statements (example: calmer music in lower scores -> more intense music as score gets higher)

// // Within the render function, possibility to change background color theme/flashing colors to emphasize intensity in concert with music changes

// // Point total should be sum of total snake pickups

// // Highest score should remain on screen indefinitely even upon user resetting the game (only current score should reset)

// // Set a variable snakeIndex so that each arrow listener will just reference that variable, and not need to loop through the board each time before

// init()

// function init(){
//   board = 
//   [null,null,null,null,null,null,null,null,null,null,null,null,
//     null,"pickup",null,null,null,null,null,null,null,null,null,null,
//     null,null,null,null,null,null,null,null,null,null,null,null,
//     null,null,null,null,null,null,null,null,null,null,null,null,
//     null,null,null,null,null,null,null,null,null,null,null,null,
//     null,null,null,null,null,null,null,null,null,null,null,null,
//     null,null,null,null,null,null,null,null,null,null,null,null,
//     null,null,null,null,null,null,null,null,null,null,null,null,
//     null,null,null,null,null,null,null,null,null,null,null,null,
//     null,null,null,null,null,null,null,null,null,null,null,"snake"]

//   snakeIndex = board.findIndex(idx => idx === "snake")
//   pickupIndex = board.findIndex(idx => idx === "pickup")

//   snakeBody = [119]
//   console.log(snakeBody)
//   console.log(snakeIndex)
//   console.log(pickupIndex)

//   currentScore = 0;

//   play()
//   render()
//   }

// function play(){
//   // Upon the snake being at the same location of the pickup, add +1 snake cell to end of snake
//     // keep track of current index of snake & compare it to index of pickup 
//     if(snakeIndex === pickupIndex){
//       if (snakeDirection === "up"){
//         snakeBody.push(snakeIndex + numberOfColumns)
//       } else if (snakeDirection === "down"){
//         snakeBody.push(snakeIndex - numberOfColumns)
//       } else if (snakeDirection === "left"){
//         snakeBody.push(snakeIndex - 1)
//       } else if (snakeDirection === "right"){
//         snakeBody.push(snakeIndex + 1)
//       }
//       // Snake pickups should appear in random spots on the board
//       board[pickupIndex] = null
//       allCells[idx].classList.remove("pickup")
      
//       board[newPickup] = "pickup"
//       // add 1 to current score
//       currentScore += 1

//       return pickupIndex
//     }
//   } 

// function render(){
//   board.forEach((cell, idx) => {
//     allCells[idx].className = "cell"
//     if (snakeBody.includes(idx)) {
//       cell = "snake"
//     }
//     if (leftCell.includes(idx)) {
//       allCells[idx].classList.add("leftCell")
//     }
//     if (rightCell.includes(idx)) {
//       allCells[idx].classList.add("rightCell")
//     }
//     if (cell === "snake") {
//       allCells[idx].classList.add("snake")
//     }
//     if (cell === "pickup") {
//       allCells[idx].classList.add("pickup")
//     }
//     })

//   lose = function(){
//     alert("Game over")
//   }

//   highScore = localStorage.getItem("high-score")
//   // Set high score
//   if(highScore !== null){
//     if (currentScore > highScore) {
//         localStorage.setItem("high-score", highScore);      
//     }
//   }
//     else{
//       localStorage.setItem("high-score", highScore);
//   }

// }



