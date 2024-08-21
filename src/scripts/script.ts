/**
 * Represents the user hand image element.
 * @type {HTMLImageElement}
 */
const userHand = document.querySelector(".user-hand")! as HTMLImageElement;

/**
 * Represents the system hand image element.
 * @type {HTMLImageElement}
 */
const systemHand = document.querySelector(".system-hand")! as HTMLImageElement;

/**
 * Represents the message display element.
 * @type {HTMLDivElement}
 */
const message = document.querySelector(".message")! as HTMLDivElement;

/**
 * Represents the container for user selection images.
 * @type {HTMLDivElement}
 */
const userSelectionContainer = document.querySelector(
  ".user-selection-img-container",
)! as HTMLDivElement;

/**
 * Stores the user's choice.
 * @type {string}
 */
let userChoice: string;

/**
 * Stores the system's choice.
 * @type {string}
 */
let systemChoice: string;

/**
 * An array of possible choices for the game.
 * @type {string[]}
 */
const choices: string[] = ["rock", "paper", "scissor"];

/**
 * ID of the current interval for the countdown timer.
 * @type {number}
 */
let intervalId: number;

/**
 * ID of the current timeout for displaying the game result.
 * @type {number}
 */
let timeoutId: number;

/**
 * Starts the game and handles the game logic.
 *
 * @param {string} userChoice - The user's selected choice ("rock", "paper", or "scissor").
 */
function playGame(userChoice: string) {
  let time = 3;
  message.textContent = String(time--);
  systemChoice = choices[Math.trunc(Math.random() * choices.length)];

  userSelectionContainer.classList.add("disable-interaction");

  clearInterval(intervalId);
  intervalId = setInterval(() => {
    message.textContent = String(time--);
    if (time < 0) clearInterval(intervalId);
  }, 1000);

  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    if (userChoice === systemChoice) {
      message.textContent = "Draw";
    } else if (
      (userChoice === "rock" && systemChoice === "scissor") ||
      (userChoice === "scissor" && systemChoice === "paper") ||
      (userChoice === "paper" && systemChoice === "rock")
    ) {
      message.textContent = "You Won!";
    } else {
      message.textContent = "You Lost!";
    }

    userHand.src = `../assets/images/${userChoice}.png`;
    systemHand.src = `../assets/images/${systemChoice}.png`;

    userSelectionContainer.classList.remove("disable-interaction");
  }, 3000);
}

/**
 * Event handler for user selection clicks.
 *
 * @param {MouseEvent} e - The click event.
 */
userSelectionContainer.addEventListener("click", function (e) {
  const clicked = (e.target! as HTMLDivElement).closest(".img-container");
  if (!clicked) return;

  userChoice = clicked.classList[1];
  playGame(userChoice);
});
