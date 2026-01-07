'use strict';
//SELECTING ELEMENTS:-
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');

const score0El = document.querySelector('#score--0'); //dummy element //another way of selecting an element by id: //slightly faster than querySelector
const score1El = document.getElementById('score--1'); //dummy element
score0El.textContent = 0;
score1El.textContent = 0;

const infobtn = document.querySelector('.show-modal');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closemodal = document.querySelector('.close-modal');

// const score = [0, 0]; //total scores that add up , 0th-index=0 player and 1st index=1st player ka score h
// let currentScore = 0;
// let activePlayer = 0;
// let playing = true; //tells the state of the game;

let score, currentScore, activePlayer, playing;

//starting conditions:
const init = function () {
  //scope problem here:
  score = [0, 0]; //total scores that add up , 0th-index=0 player and 1st index=1st player ka score h
  currentScore = 0;
  activePlayer = 0;
  playing = true; //tells the state of the game;

  // for user interface:
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active', 'player--winner');
};

//executing initiall condition;
init();

function changePlayer() {
  //switch to next player
  //active player ka score 0 krna h
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  //next player ka score should be zero;
  currentScore = 0;
  activePlayer = 1 - activePlayer; //or we can use ternary operator also; //activePlayer= activePlayer===1?0:1;

  //changing the styles:
  //method 1:(which is my method)
  // document
  //   .querySelector(`.player--${activePlayer}`)
  //   .classList.toggle('player--active');
  // document
  //   .querySelector(`.player--${1 - activePlayer}`)
  //   .classList.toggle('player--active');
  //method 2:
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

//modal window functionality
infobtn.addEventListener('click', function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
});
function closeModal() {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}
closemodal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
});

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Generating a random dice roll

    const dice = Math.trunc(Math.random() * 6) + 1;
    // console.log(dice);

    //2. Display the dice

    diceEl.classList.remove('hidden');
    //manipulating the source element in HTML which is dice5 src
    diceEl.src = `dice-${dice}.png`;

    //3. Check for rolled 1: if true,switch to next player;

    if (dice !== 1) {
      //Add dice to current score
      currentScore = currentScore + dice; // prev logic current0El.textContent = currentScore; //change later;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; //dynamically choosing/allocating variable
    } else {
      changePlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1.Add current score to active player's score:
    score[activePlayer] = score[activePlayer] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    //2.Check if players's score is>=100: finish the game else switch to next player:
    if (score[activePlayer] >= 100) {
      //finish
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--active');
      diceEl.classList.add('hidden');
    } else {
      //switch:
      changePlayer();
    }
  }
});

btnNew.addEventListener('click', init);

// btnNew.addEventListener('click', function () {
//   init();
//   // playing = true;
//   // currentScore = 0;
//   // score[0] = 0;
//   // score[1] = 0;
//   // activePlayer = 0;
//   //for user interface:
// });
