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

function computerSelection() {
    const min = 0, max = 2;
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function playerSelection() {
    const selection = prompt(`# Choose your weapon:
    
✂️ - Scissors
🪨 - Rock
📄 - Paper
`);

    let selectionIndex = items.indexOf(selection.toLowerCase());

    if (selectionIndex === -1) {
        // Affecting the returned value to selectionIndex when the last function in the call stack triggers a 'recursion end' at the moment the user enters a valid string
        selectionIndex = playerSelection();
    }
    
    return selectionIndex;
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

function game() {
    while (playerScore < 5 && computerScore < 5)
        console.log(playRound(playerSelection(), computerSelection()));

    let finalScore = `
Player: ${playerScore} | Computer: ${computerScore}
    `;

    playerScore > computerScore ? alert(`You win! ${finalScore}`) : alert(`You Lose! ${finalScore}`);
}

game();
