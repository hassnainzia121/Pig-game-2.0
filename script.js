const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

const score1El = document.getElementById("score--1");
const score0El = document.getElementById("score--0");

const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");

const btnRoll = document.querySelector(".btn--roll");
const btnNew = document.querySelector(".btn--new");
const btnHold = document.querySelector(".btn--hold");
const btnToss = document.querySelector(".btn--toss");

let score, currentScore, activePlayer, hasTossed, playing;

const init = () => {
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  hasTossed = false;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  btnRoll.disabled = true;
  btnHold.disabled = true;

  diceEl.classList.add("hidden");
  btnToss.classList.remove("hidden");
  btnRoll.classList.add("hidden");
  btnNew.classList.add("hidden");
  btnHold.classList.add("hidden");

  player0El.classList.remove("player--active");
  player1El.classList.remove("player--active");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
};
init();

const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

btnToss.addEventListener("click", function () {
  if (!playing || hasTossed) return;

  btnRoll.classList.remove("hidden");
  btnNew.classList.remove("hidden");
  btnHold.classList.remove("hidden");
  const toss = Math.trunc(Math.random() * 2) + 1;
  diceEl.classList.remove("hidden");
  diceEl.src = `dice-${toss}.png`;

  if (toss === 1) {
    activePlayer = 0;
    player0El.classList.add("player--active");
  } else {
    activePlayer = 1;
    player1El.classList.add("player--active");
  }

  hasTossed = true;
  btnRoll.disabled = false;
  btnHold.disabled = false;
});

btnRoll.addEventListener("click", function () {
  if (playing && hasTossed) {
    btnToss.classList.add("hidden");
    if (playing) {
      const dice = Math.trunc(Math.random() * 6) + 1;

      diceEl.classList.remove("hidden");
      diceEl.src = `dice-${dice}.png`;

      if (dice !== 1) {
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent =
          currentScore;
      } else {
        switchPlayer();
      }
    }
  }
});

btnHold.addEventListener("click", () => {
  if (playing) {
    score[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    if (score[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
