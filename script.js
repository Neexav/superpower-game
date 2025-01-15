const superpowerAttacks = [
    "Fireball", "Ice Blast", "Thunder Strike", "Earthquake", "Wind Gust",
    "Water Cannon", "Shadow Sneak", "Light Beam", "Meteor Smash", "Blizzard"
];

let playerHp = 150;
let computerHp = 150;

const playerHpEl = document.getElementById('player-hp');
const computerHpEl = document.getElementById('computer-hp');
const playerHealthBar = document.getElementById('player-health-bar');
const computerHealthBar = document.getElementById('computer-health-bar');
const attackListEl = document.getElementById('attack-list');
const resetButton = document.getElementById('reset-game');

function updateHealthBars() {
    playerHealthBar.style.width = `${(playerHp / 150) * 100}%`;
    computerHealthBar.style.width = `${(computerHp / 150) * 100}%`;
}

function displayAttacks() {
    attackListEl.innerHTML = '';
    const attacks = getRandomAttacks();
    attacks.forEach((attack, index) => {
        const attackDiv = document.createElement('div');
        attackDiv.textContent = attack;
        attackDiv.classList.add('attack-item');
        attackDiv.addEventListener('click', () => handleAttack(attack));
        attackListEl.appendChild(attackDiv);
    });
}

function getRandomAttacks() {
    return superpowerAttacks.sort(() => 0.5 - Math.random()).slice(0, 4);
}

function handleAttack(playerAttack) {
    const computerAttack = superpowerAttacks[Math.floor(Math.random() * superpowerAttacks.length)];

    const playerStrength = superpowerAttacks.indexOf(playerAttack);
    const computerStrength = superpowerAttacks.indexOf(computerAttack);

    alert(`You used ${playerAttack}! Computer used ${computerAttack}.`);

    if (playerStrength > computerStrength) {
        computerHp = Math.max(0, computerHp - 40);
        alert('Your attack was stronger! Computer loses 40 HP.');
    } else if (playerStrength < computerStrength) {
        playerHp = Math.max(0, playerHp - 40);
        alert('Computer\'s attack was stronger! You lose 40 HP.');
    } else {
        alert('It\'s a tie! No damage dealt.');
    }

    updateHealthBars();
    checkGameOver();
}

function checkGameOver() {
    if (playerHp <= 0) {
        alert('Game Over! You lost. Try again!');
        resetGame();
    } else if (computerHp <= 0) {
        alert('Congratulations! You won!');
        resetGame();
    }
}

function resetGame() {
    playerHp = 150;
    computerHp = 150;
    updateHealthBars();
    displayAttacks();
}

// Initialize the game
updateHealthBars();
displayAttacks();

resetButton.addEventListener('click', resetGame);
