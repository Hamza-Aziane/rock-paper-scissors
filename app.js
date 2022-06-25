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

// Get initial values to re-assign later on round reset
const initRpsItemContainer = rpsItemContainer.innerHTML;
const initRpsItemsContainer = rpsItemsContainer.innerHTML;
const initPlayerChoiceText = playerChoiceText.textContent;
const initCpuChoiceText = cpuChoiceText.textContent;

// Add click event listener to all rps items
function addEventListeners() {
    const rpsItems = document.querySelectorAll('.player .items > *');
    function getRpsItemName (e) {
        const rpsItemName = e.target.getAttribute('alt');
        game(rpsItemName);
    }
    rpsItems.forEach(item => item.addEventListener('click', getRpsItemName));
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

    setTimeout(roundReset, 2000);

    // Check for win or lost
    if (subResult === 1 || subResult === -2) {
        playerScore++;
        return `You Win! ${playerSelectedItem} beats ${computerSelectedItem}`;
    }
    else if (subResult === -1 || subResult === 2) {
        computerScore++;
        return `You Lose! ${computerSelectedItem} beats ${playerSelectedItem}`;
    }
    return 'Draw!';
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

function game (rpsItemName) {
    if (playerScore < 5 && computerScore < 5) {
        console.log(playRound(playerSelection(rpsItemName), computerSelection()));
    }

    else {

            let finalScore = `
        Player: ${playerScore} | Computer: ${computerScore}
            `;

            playerScore > computerScore ? alert(`You win! ${finalScore}`) : alert(`You Lose! ${finalScore}`);

    }
}

// game();
