/*-------------------------------- Constants --------------------------------*/

const speed = 150;

const numberOfRows = 10

const numberOfColumns = 12

/*-------------------------------- Variables --------------------------------*/

let win, loss, currentScore, highScore, snakeColor, pickupColor, snakeDirection, snakeIndex, pickupIndex

let board = [] // (will be full of null squares with one square holding the value the pickup will be assigned to)

/*------------------------ Cached Element References ------------------------*/

const allCells = document.querySelectorAll(".cell")

const snake = document.querySelector(".snake")

const pickup = document.querySelector(".pickup")

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

// keydown (for movement via keyboard)
document.addEventListener('keydown', arrowMovement)

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
  board = 
  [null,null,null,null,null,null,null,null,null,null,null,null,
    null,"pickup",null,null,null,null,null,null,null,null,null,null,
    null,null,null,null,null,null,null,null,null,null,null,null,
    null,null,null,null,null,null,null,null,null,null,null,null,
    null,null,null,null,null,null,null,null,null,null,null,null,
    null,null,null,null,null,null,null,null,null,null,null,null,
    null,null,null,null,null,null,null,null,null,null,null,null,
    null,null,null,null,null,null,null,null,null,null,null,null,
    null,null,null,null,null,null,null,null,null,null,null,null,
    null,null,null,null,null,null,null,null,null,null,null,"snake"]

  snakeIndex = board.findIndex(idx => idx === "snake")
  pickupIndex = board.findIndex(idx => idx === "pickup")

  currentScore = 0;
  highScore = null;


  // play()
  render()
  }

// function play(){
//   // Upon the snake being at the same location of the pickup, add +1 snake cell to end of snake
//   for (let idx = 0; idx < board.length; idx++) {
//     // keep track of current index of snake & compare it to index of pickup 
//     if(snakeIndex === pickupIndex){
//       // Add the snake class to an adjacent cell with context to current snake movement
//       if (snakeDirection === "up"){
//         allCells[idx + numberOfColumns].classList.add("snake")
//       } else if (snakeDirection === "down"){
//         allCells[idx - numberOfColumns].classList.add("snake")
//       } else if (snakeDirection === "left"){
//         allCells[idx + 1].classList.add("snake")
//       } else if (snakeDirection === "right"){
//         allCells[idx - 1].classList.add("snake")
//       }
//       // Remove the pickup class from the current cell
//       allCells[idx].classList.remove("pickup")
//       board[idx + 1] = "snake"
//       // Snake pickups should appear in random spots on the board
//       let newPickup = allCells[Math.floor(Math.random() * (numberOfColumns * numberOfRows))]
//       board[(parseInt(newPickup.id)) - 1] = "pickup"
//       // add 1 to current score
//       currentScore += 1

//       console.log(newPickup)
//       console.log(board[(parseInt(newPickup.id)) - 1])
//       return pickupIndex
//     }
//   } 
// }

function render(){
  const leftCell = [0, 12, 24, 36, 48, 60, 72, 84, 96, 108]
  const rightCell = [11, 23, 35, 47, 59, 71, 83, 95, 107, 119]
  board.forEach((cell, idx) => {
    allCells[idx].className = "cell"
    if (leftCell.includes(idx)) {
      allCells[idx].classList.add("leftCell")
    }
    if (rightCell.includes(idx)) {
      allCells[idx].classList.add("rightCell")
    }
    if (cell === "snake") {
      allCells[idx].classList.add("snake")
    }
    if (cell === "pickup") {
      allCells[idx].classList.add("pickup")
    }
  })
  




highScore = localStorage.getItem("high-score")
// Set high score
if(highScore !== null){
  if (currentScore > highScore) {
      localStorage.setItem("high-score", highScore);      
  }
}
  else{
    localStorage.setItem("high-score", highScore);
}


}

// Arrow key event listeners for snake movement
function arrowMovement(evt){  
  // When ArrowUp is pressed, move snake up
  if (evt.key === 'ArrowUp') {
    // comparing positional change to occur vs. spaces available
    if (snakeIndex - numberOfColumns >= 0){
      // adjust board array to reflect value change in previous and current snake square
      board[snakeIndex] = null
      board[snakeIndex - numberOfColumns] = "snake"
      // set variable snakeDirection to later determine where new snake pickups should be attached to
      snakeDirection = "up"
      // snakeIndex is adjusted to the new position after change
      snakeIndex -= numberOfColumns
      console.log(snakeIndex)
      render()
    }
      else{
        console.log(snakeIndex - numberOfColumns + 1)
        lose()
    }
  }
  // When ArrowDown is pressed, move snake down
  if (evt.key === 'ArrowDown') {
    // comparing positional change to occur vs. spaces available
    if (snakeIndex + numberOfColumns <= numberOfRows * numberOfColumns){
      // adjust board array to reflect value change in previous and current snake square
      board[snakeIndex] = null
      board[snakeIndex + numberOfColumns] = "snake"
      // set variable snakeDirection to later determine where new snake pickups should be attached to
      snakeDirection = "down"
      // snakeIndex is adjusted to the new position after change
      snakeIndex += numberOfColumns
      console.log(snakeIndex)
      render()
    }
    else{
      console.log(snakeIndex - numberOfColumns + 1)
      lose()
    }
  }
  // When ArrowLeft is pressed, move snake left
  if (evt.key === 'ArrowLeft') {
    // comparing positional change to occur vs. spaces available
    if (snakeIndex - 1 >= 1 && leftCell.includes(snakeIndex) === false){
      // adjust board array to reflect value change in previous and current snake square
      board[snakeIndex] = null
      board[snakeIndex - 1] = "snake"
      // set variable snakeDirection to later determine where new snake pickups should be attached to
      snakeDirection = "left"
      // snakeIndex is adjusted to the new position after change
      snakeIndex -= 1
      console.log(snakeIndex)
      render()
    }
    else{
      console.log(snakeIndex - numberOfColumns + 1)
      lose()
    }
  }
}




// // Arrow key event listeners for snake movement
// function arrowMovement(evt){

//   let removeSnakeClass = function(idx){
//     allCells[idx].classList.remove("snake")
//   }
  
//   // When ArrowUp is pressed, move snake up
//   if (evt.key === 'ArrowUp') {    
//     // iterate across the board array to find snake element
//     for (let idx = 0; idx < board.length; idx++) {
//       const el = board[idx]
//         if (el === "snake"){
//           // comparing positional change to occur vs. spaces available
//           if ((parseInt(allCells[idx].id)) - numberOfColumns >= 1){
//             console.log(parseInt(allCells[idx].id) - numberOfColumns)
//             // reset class name of cell snake was previously at to "cell" to maintain empty cell styling
//             removeSnakeClass(idx)
//             // assign new cell snake is in with the class of "cell snake"
//             allCells[idx - numberOfColumns].classList.add("snake")
//             // adjust board array to reflect value change in previous and current snake square
//             board[idx] = null
//             board[idx - numberOfColumns] = "snake"
//             // set variable snakeDirection to later determine where new snake pickups should be attached to
//             snakeDirection = "up"
//             snakeIndex = snakeIndex - numberOfColumns
//             return snakeIndex      
//         } else {
//           console.log("cell id:", allCells[idx].id)
//           console.log(board[idx])
//           console.log(parseInt(allCells[idx].id))
//             lose()
//           }
//         }
//       }
//     } 
  
//   // When ArrowDown is pressed, move snake down
//   if (evt.key === 'ArrowDown') {
//     // iterate across the board array to find snake element
//     for (let idx = 0; idx < board.length; idx++) {
//       const el = board[idx]
//         if (el === "snake"){
//           // comparing positional change to occur vs. spaces available
//           if (((parseInt(allCells[idx].id)) + numberOfColumns) <= (numberOfColumns * numberOfRows)){
//             // reset class name of cell snake was previously at to "cell" to maintain empty cell styling
//             removeSnakeClass(idx)
//             // assign new cell snake is in with the class of "cell snake"
//             allCells[idx + numberOfColumns].classList.add("snake")
//             // adjust board array to reflect value change in previous and current snake square
//             board[idx] = null 
//             board[idx + numberOfColumns] = "snake"
//             // set variable snakeDirection to later determine where new snake pickups should be attached to
//             snakeDirection = "down"
//             // snakeLocation = board[]
//             console.log(snakeIndex)
//             snakeIndex = snakeIndex + numberOfColumns
//             return snakeIndex  
//         } else {
//               lose()
//           }
//         }
//       }
//     }
  
  // // When ArrowLeft is pressed, move snake left
  // if (evt.key === 'ArrowLeft') {
  //   // iterate across the board array to find snake element
  //   for (let idx = 0; idx < board.length; idx++) {
  //     const el = board[idx]
  //       if (el === "snake"){
  //         // comparing positional change to occur vs. spaces available
  //         if (((parseInt(allCells[idx].id)) - 1) >= 1 && allCells[idx].className !== "cell endLeft snake"){
  //           // reset class name of cell snake was previously at to "cell" to maintain empty cell styling
  //           removeSnakeClass(idx)
  //           // assign new cell snake is in with the class of "cell snake"
  //           allCells[idx - 1].classList.add("snake")
  //           // adjust board array to reflect value change in previous and current snake square
  //           board[idx] = null 
  //           board[idx - 1] = "snake"
  //           // set variable snakeDirection to later determine where new snake pickups should be attached to
  //           snakeDirection = "left"
  //           console.log(snakeIndex)
  //           snakeIndex
  //           return snakeIndex  
  //       } else {
  //             lose()
  //         }
  //       }
  //     }
  //   }
  
//   // When ArrowRight is pressed, move snake right
//   if (evt.key === 'ArrowRight') {
//     // iterate across the board array to find snake element
//     for (let idx = 0; idx < board.length; idx++) {
//       const el = board[idx]
//         if (el === "snake"){
//           // comparing positional change to occur vs. spaces available
//           if (((parseInt(allCells[idx].id)) + 1) <= (numberOfColumns * numberOfRows) && allCells[idx].className !== "cell endRight snake"){
//             // reset class name of cell snake was previously at to "cell" to maintain empty cell styling
//             removeSnakeClass(idx)
//             // assign new cell snake is in with the class of "cell snake"
//             allCells[idx + 1].classList.add("snake")
//             // adjust board array to reflect value change in previous and current snake square
//             board[idx] = null 
//             board[idx + 1] = "snake"
//             // set variable snakeDirection to later determine where new snake pickups should be attached to
//             snakeDirection = "right"
//             console.log(snakeIndex)
//             return snakeIndex  
//         } else {
//               lose()
//           }
//         }
//       }
//     }
//   }
  




function lose(){
  alert("Game over")
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