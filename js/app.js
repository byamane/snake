/*-------------------------------- Constants --------------------------------*/

const speed = 150;

const numberOfRows = 10

const numberOfColumns = 12


/*-------------------------------- Variables --------------------------------*/

let win, loss, currentScore, highScore, snakeColor, pickupColor

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

// Within the render function, score-dependent popups via if statements (i.e. small confetti for a score of 10, fireworks for a score of 30)

// Within the render function, change music based off higher score thresholds via if statements (example: calmer music in lower scores -> more intense music as score gets higher)

// Within the render function, possibility to change background color theme/flashing colors to emphasize intensity in concert with music changes

// Within the play function, when user crashes into wall or its own body, end the game

// Point total should be sum of total snake pickups

// Highest score should remain on screen indefinitely even upon user resetting the game (only current score should reset)

init()

function init(){
  board = 
  [null,null,null,null,null,null,null,null,null,null,null,null,
    null,null,null,null,null,null,null,null,null,null,null,null,
    null,null,null,null,null,null,null,null,null,null,null,null,
    null,null,null,null,null,null,null,null,null,null,null,null,
    null,null,null,null,null,null,null,null,null,null,null,null,
    null,null,null,null,null,null,null,null,null,null,null,null,
    null,null,null,null,null,null,null,null,null,null,null,null,
    null,null,null,null,null,null,null,null,null,null,null,null,
    null,null,null,null,null,null,null,null,null,null,null,null,
    null,null,null,null,null,null,null,null,null,null,null,"snake"]
  
  console.log(board[119])

  currentScore = 0;
  highScore = null;


  // play()
  // render()
  }

function play(){




}

function render(){




highScore = localStorage.getItem("high-score")
// Set high score
if(highscore !== null){
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
  let removeSnakeClass = function(idx){
    allCells[idx].classList.remove("snake")
  }
  // When ArrowUp is pressed, move snake up
  if (evt.key === 'ArrowUp') {
    // move snake up by 1
    board.forEach((el, idx) => {
      if (el === "snake"){
        if ((parseInt(allCells[idx].id)) - numberOfColumns + 1 > numberOfColumns){
          // reset class name of cell snake was previously at to "cell" to maintain empty cell styling
          removeSnakeClass(idx)
          // assign new cell snake is in with the class of "cell snake"
          allCells[idx - numberOfColumns].classList.add("snake")
          // adjust board array to reflect value change in previous and current snake square
          board[idx] = "null" 
          board[idx - numberOfColumns] = "snake"
        } else {
            lose()
          }
      }
    })
  }
}

// function arrowMovement(evt){
//   let removeSnakeClass = function(idx){
//     allCells[idx].classList.remove("snake")
//   }
//   // When ArrowUp is pressed, move snake up
//   if (evt.key === 'ArrowUp') {
//     // move snake up by 1
//     board.forEach((el, idx) => {
//       if (el === "snake" && (parseInt(allCells[idx - numberOfColumns].id)) > numberOfColumns){
//         // reset class name of cell snake was previously at to "cell" to maintain empty cell styling
//         removeSnakeClass(idx)
//         // assign new cell snake is in with the class of "cell snake"
//         allCells[idx - numberOfColumns].classList.add("snake")
//           // adjust board array to reflect value change in previous and current snake square
//           board[idx] = "null" 
//           board[idx - numberOfColumns] = "snake"
//         } else {
//             console.log(parseInt(allCells[idx - numberOfColumns].id))
//             // lose()
//           }
//       })
//     }
//   }


function lose(){
  alert("Game over")
}

  // if statement checking if (parseInt(el.id) < 12){
  //   return
  // } 



// forEach to iterate through array
  // if (element.className === "snake")
    // classList.add to row above (id)
    // classList.remove to row below (where snake was previously at)




// // When ArrowDown is pressed, move snake down
//   if (evt.key === 'ArrowDown') {
//     setTimeout(() => console.log("move down"), speed)
//   }
// // When ArrowLeft is pressed, move snake left
//   if (evt.key === 'ArrowLeft') {
//     setTimeout(() => console.log("move left"), speed)
//   }
// // When ArrowRight is pressed, move snake right
//   if (evt.key === 'ArrowRight') {
//     setTimeout(() => console.log("move right"), speed)
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