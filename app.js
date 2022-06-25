/*

// Assigning each item his index value in the items array
Paper       =>    📄 = 2
Rock        =>    🪨 = 1
Scissors    =>    ✂️ = 0

// We know that rock beats scissors, paper beats rock, scissors beats paper and so on...
... ✂️ > 📄 > 🪨 > ✂️

// Representing the player and computer with emojis for an easy reading
Computer    =>    💻
Player      =>    👨🏻‍🦱

// Doing subtraction with all the possible items combinations to see if we con notice any pattern to work upon
👨🏻‍🦱  💻          Winner
0 - 1 = -1  =>  💻
1 - 2 = -1  =>  💻
2 - 0 = 2   =>  💻
2 - 1 = 1   =>  👨🏻‍🦱
1 - 0 = 1   =>  👨🏻‍🦱
0 - 2 = -2  =>  👨🏻‍🦱

# From the above we can conclude the following:
+ The player 👨🏻‍🦱 wins when the subtraction equals to 1 or -2
+ The computer 💻 wins when the subtraction equals to -1 or 2
+ If the subtraction is 0 then it's a draw

*/

const items = ['scissors', 'rock', 'paper'];
let computerScore = 0, playerScore = 0, roundNumber = 0;

let computerSelection = () => Math.floor(Math.random() * items.length);

// Get items for later on manipulation
const rpsItemsContainer = document.querySelector('.player .items');
const rpsItemContainer = document.querySelector('.computer .item');
const playerChoiceText = document.querySelector('.player .choice');
const cpuChoiceText = document.querySelector('.computer .choice');
const result = document.querySelector('.game .result');

// Get initial values to re-assign later on round reset
const initRpsItemContainer = rpsItemContainer.innerHTML;
const initRpsItemsContainer = rpsItemsContainer.innerHTML;
const initPlayerChoiceText = playerChoiceText.textContent;
const initCpuChoiceText = cpuChoiceText.textContent;

function gameOver() {
    return (computerScore === 5 || playerScore === 5)
}

function getRpsItemName (e) {
    const rpsItemName = e.target.getAttribute('alt');
    game(rpsItemName);
}

// Add click event listener to all rps items
function addEventListeners() {
    const rpsItems = document.querySelectorAll('.player .items > *');
    rpsItems.forEach(item => item.addEventListener('click', getRpsItemName));
}

function removeEventListeners() {
    const rpsItems = document.querySelectorAll('.player .items > *');
    rpsItems.forEach(item => item.removeEventListener('click', getRpsItemName));
}

addEventListeners();

// Return player selection index in items[]
function playerSelection(rpsItemName) {
    return items.indexOf(rpsItemName);
}

// Capitalize the selected item's name
function capitalizeItemName(selection) {
    return items[selection][0].toUpperCase() + items[selection].slice(1);
}

//Round reset
function roundReset() {
    rpsItemContainer.innerHTML = initRpsItemContainer;
    rpsItemsContainer.innerHTML = initRpsItemsContainer;
    playerChoiceText.textContent  = initPlayerChoiceText;
    cpuChoiceText.textContent = initCpuChoiceText;
    cpuChoiceText.style = 'margin-top: 2.5rem';
    result.textContent = '';

    addEventListeners();
}

function playRound(playerSelection, computerSelection) {
    const subResult = playerSelection - computerSelection;
    const playerSelectedItem = capitalizeItemName(playerSelection);
    const computerSelectedItem = capitalizeItemName(computerSelection);
    updateComputerUI(computerSelectedItem.toLowerCase());
    updatePlayerUI(playerSelectedItem.toLowerCase());

    //Update round's number in UI
    roundNumber++;
    const roundNumberUI = document.querySelector('.round-number');
    roundNumberUI.textContent = `Round ${roundNumber}`;

    removeEventListeners();
    setTimeout(roundReset, 1300);

    // Check for win or lost
    if (subResult === 1 || subResult === -2) {
        playerScore++;
        updateScoreStars(playerScore, 'player');
        result.textContent = 'You Win!';
    }
    else if (subResult === -1 || subResult === 2) {
        computerScore++;
        updateScoreStars(computerScore, 'computer');
        result.textContent = 'You Lose!';
    }
    else
        result.textContent = 'Draw!';
}

function updatePlayerUI (rpsItemName) {
    const rpsElement = document.querySelector(`img[alt=${rpsItemName}]`);
    const rpsItems = document.querySelectorAll('.player .items > *');

    rpsItems.forEach(item => item.remove());
    rpsItemsContainer.append(rpsElement);
    playerChoiceText.textContent = capitalizeItemName(items.indexOf(rpsItemName));
}

function updateComputerUI (rpsItemName) {
    const playerRpsElement = document.querySelector(`img[alt=${rpsItemName}]`);
    const rpsElement = playerRpsElement.cloneNode(true);
    const loadingIcon = document.querySelector('.computer .loading');


    loadingIcon.remove();
    rpsItemContainer.append(rpsElement);
    cpuChoiceText.style = 'margin-top: 0'
    cpuChoiceText.textContent = capitalizeItemName(items.indexOf(rpsItemName));
}

function updateScoreStars(starNumber, player) {
    const starElement = document.querySelector(`.${player} .star-${starNumber}`);
    starElement.classList.remove('empty-star');
    starElement.classList.add('full-star');
}

function game (rpsItemName) {
    if (!gameOver()) {
        playRound(playerSelection(rpsItemName), computerSelection());
    }

    else {
        removeEventListeners();
        result.textContent = 'Play Again!';
    }
}

// game();
