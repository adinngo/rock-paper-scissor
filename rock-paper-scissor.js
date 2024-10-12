const display_result = document.getElementById("display-result");
const backdrop = document.querySelector(".backdrop");
const modal = document.querySelector(".modal");
const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");
const autoPlayBtn = document.getElementById("autoPlay-btn");

const score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

document.getElementById("rock-btn").onclick = () => {
  playGame("rock");
};
document.getElementById("paper-btn").onclick = () => {
  playGame("paper");
};
document.getElementById("scissors-btn").onclick = () => {
  playGame("scissors");
};
document.getElementById("reset-btn").onclick = () => {
  displayModal();
};

//set up Auto play button
let isInterval = false;
let myInterval = "";
autoPlayBtn.onclick = () => {
  if (isInterval) {
    clearInterval(myInterval);
    isInterval = false;
    autoPlayBtn.textContent = "Auto Play";
  }
  else {
    myInterval = setInterval(() => {
      const playerMove = computerPlay();
      playGame(playerMove);
    }, 100);
    isInterval = true;
    autoPlayBtn.textContent = "Stop Play";
  }
};

yesBtn.onclick = () => {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem("score");
  updateScore();
  display_result.innerHTML = ``;
  closeModal();
};
noBtn.onclick = () => {
  closeModal();
};

updateScore();

const computerPlay = () => {
  let computerPick = "";
  const computerMove = Math.random();
  if (computerMove >= 2 / 3) computerPick = "scissors";
  else if (computerMove > 1 / 3) computerPick = "paper";
  else computerPick = "rock";
  return computerPick;
};

const playGame = (playerPick) => {
  let result = "";
  const computerPick = computerPlay();
  if (playerPick === "rock") {
    if (computerPick === "rock") result = "tie";
    else if (computerPick === "paper") result = "lose";
    else result = "win";
  } else if (playerPick === "paper") {
    if (computerPick === "rock") result = "win";
    else if (computerPick === "paper") result = "tie";
    else result = "lose";
  } else {
    if (computerPick === "rock") result = "lose";
    else if (computerPick === "paper") result = "win";
    else result = "tie";
  }

  if (result === "win") score.wins++;
  else if (result === "lose") score.losses++;
  else score.ties++;

  //save result
  localStorage.setItem("score", JSON.stringify(score));

  display_result.innerHTML = `
        <p >You ${result}</p>
        <p>You <img src="./asset/images/${playerPick}.png" class="move-icon"/>
        <img src="./asset/images/${computerPick}.png" class="move-icon"/> Computer
        </p>     
        `;
  updateScore();
};

function updateScore() {
  document.getElementById(
    "display-score"
  ).innerHTML = `<p class="display-score">Win: ${score.wins} || Lose: ${score.losses} || Tie: ${score.ties}</p>`;
}

// display modal
function displayModal() {
  backdrop.style.display = "block";
  modal.style.display = "block";
}
//close modal
function closeModal() {
  backdrop.style.display = "none";
  modal.style.display = "none";
}
