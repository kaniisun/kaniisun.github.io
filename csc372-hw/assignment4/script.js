const playerChoices = document.querySelectorAll('.throw');
const cpuImg = document.getElementById('cpu-img');
const results = document.getElementById('result');
const reset = document.getElementById('reset-btn');
const imgs = {
    rock: 'images/rock.PNG',
    paper: 'images/paper.PNG',
    scissors: 'images/scissors.PNG'
};

// adds/removes border around image that player decides to throw
function playerThrows(throws) {
    playerChoices.forEach(t => t.querySelector('img').classList.remove('selected'));
    document.querySelector(`#${throws} img`).classList.add('selected');
}

// randomizes cpu choices
function cpuThrow() {
    const throws = ['rock', 'paper', 'scissors'];

    return throws[Math.floor(Math.random() * throws.length)];
}

// shuffle cpu throw images
function cpuShuffle(callback) {
    let index = 0;

    // shuffle the images every half second
    const interval = setInterval(() => {
        // change img to cpu's current choices
        cpuImg.src = imgs[Object.keys(imgs)[index]];
        index = (index + 1) % 3;
    }, 500);

    // stop shuffling after 3 secs, pick final cpu throw
    setTimeout(() => {
        clearInterval(interval);
        callback();
    }, 3000);
}

// listen for players choice
playerChoices.forEach(throws => {
    throws.addEventListener('click', () => {
        const pThrow = throws.id;
        playerThrows(pThrow);

        // start cpu shuffle, get cpu's final throw and update the img
        cpuShuffle(() => {
            const cThrow = cpuThrow();
            cpuImg.src = imgs[cThrow];

            const theResult = theWinner(pThrow, cThrow);
            result(theResult);
        });
    });
});

// determine winner
function theWinner(player, cpu) {
    if (
        (player === 'rock' && cpu === 'scissors') ||
        (player === 'paper' && cpu === 'rock') ||
        (player === 'scissors' && cpu === 'paper')
    ) {
        return 'player';

    } else if (player === cpu) {
        return 'tie';

    } else {
        return 'cpu';

    }
}

// display winner results
function result(winner) {
    if (winner === 'player') {
        results.textContent = "RESULTS: YOU WIN!";

    } else if (winner === 'tie') {
        results.textContent = "RESULTS: TIE!";

    } else {
        results.textContent = "RESULTS: CPU WINS!";

    }
}

// reset game to original state
reset.addEventListener('click', () => {
    playerChoices.forEach(t => t.querySelector('img').classList.remove('selected'));
    cpuImg.src = 'images/question-mark.PNG';
    results.textContent = 'RESULTS:';
})