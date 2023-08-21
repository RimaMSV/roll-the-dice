'use strict';

const player0El = document.querySelector('.player-0');
const player1El = document.querySelector('.player-1');

const score0El = document.getElementById('score-0');
const score1El = document.getElementById('score-1');

const current0El = document.getElementById('current-0');
const current1El = document.getElementById('current-1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn-new');
const btnRoll = document.querySelector('.btn-roll');
const btnHold = document.querySelector('.btn-hold');

/* Starting Conditions */
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const scores = [0, 0]; //Scores of both side at first.
let currentScore = 0;
let activePlayer = 0; //Players are :num 0 and num 1.
let playing = true;

const switchPlayer = function () {
  document.getElementById(`current-${activePlayer}`).textContent = 0;
  currentScore = 0;

  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    let dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice); //ffor checkin

    diceEl.classList.remove('hidden');
    diceEl.src = `./images/dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current-${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next player
      switchPlayer();
    }

    btnHold.addEventListener('click', function () {
      if (playing) {
        // 1. add current score to active player
        scores[activePlayer] += currentScore;

        document.getElementById(`score-${activePlayer}`).textContent =
          scores[activePlayer];

        //2. Check if player's score is >= 20
        if (scores[activePlayer] >= 20) {
          //Finish the game
          playing = false;
          diceEl.classList.add('hidden');

          document
            .querySelector(`.player-${activePlayer}`)
            .classList.add('player--winner');

          document
            .querySelector(`.player-${activePlayer}`)
            .classList.remove('player--active');
        } else {
          //switch to next player
          switchPlayer();
        }
      }
    });
  }
});
