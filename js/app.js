/*-------------------------------- Constants --------------------------------*/

// const speed


/*-------------------------------- Variables --------------------------------*/

let win, loss, currentScore, highScore, snakeColor, pickupColor

let board = [] // (will be full of null squares with one square holding the value the pickup will be assigned to)

/*------------------------ Cached Element References ------------------------*/

// const snake = document.querySelector(".snake")

const squareEls = document.querySelectorAll("div")

// const pickup = document.querySelector(".pickup")

// const gameStatus = document.querySelector(".message")

const body = document.querySelector("body")

const lightDarkBtn = document.querySelector("#light-dark-button")

/*----------------------------- Event Listeners -----------------------------*/

// keydown (for movement via keyboard)

// onclick (for movement on virtual keypad)

// reset (to reset game)

lightDarkBtn.addEventListener("click", toggleLightDark)

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

function init(){
  board = [null,null,null,null]
}







function toggleLightDark() {
  body.className = body.className === "dark" ? "" : "dark"
}

function checkDarkPref() {
  if (
    window.matchMedia("(prefers-color-scheme:dark)").matches &&
    body.className !== "dark"
  ) {
    toggleLightDark()
  }
}

checkDarkPref()