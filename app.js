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
let computerScore = 0, playerScore = 0;

let computerSelection = () => Math.floor(Math.random() * items.length);

// Add click event listener to all rps items
const rpsItems = document.querySelectorAll('.items > *');
function getRpsItemName (e) {
    const rpsItemName = e.target.getAttribute('alt');
    game(rpsItemName);
}
rpsItems.forEach(item => item.addEventListener('click', getRpsItemName));

// Return player selection index in items[]
function playerSelection(rpsItemName) {
    console.log(items.indexOf(rpsItemName));
    return items.indexOf(rpsItemName);
}

// Get selected element's innerHTML
function getSelectedElement(rpsItemName) {
    const rpsElement = document.querySelector(`img[alt=${rpsItemName}]`);
    return rpsElement;
}

function selectedItemName(selection) {
    return items[selection][0].toUpperCase() + items[selection].slice(1);
}

function playRound(playerSelection, computerSelection) {
    const subResult = playerSelection - computerSelection;    
    const playerSelectedItem = selectedItemName(playerSelection);
    const computerSelectedItem = selectedItemName(computerSelection);

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

function game(rpsItemName) {
    while (playerScore < 5 && computerScore < 5) {
        console.log(playRound(playerSelection(rpsItemName), computerSelection()));
        getSelectedElement(rpsItemName);
    }

    let finalScore = `
Player: ${playerScore} | Computer: ${computerScore}
    `;

    playerScore > computerScore ? alert(`You win! ${finalScore}`) : alert(`You Lose! ${finalScore}`);
}

// game();
