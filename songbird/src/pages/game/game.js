import '../../assets/styles/fonts.css'
import '../../assets/styles/normalize.css'
import '../../assets/styles/body.css'
import '../../assets/styles/header.css'
import '../../assets/styles/footer.css'
import './game.css'
import './player.css'

import birdsData from '../../assets/js/birds'
import { burgerOpen, openBurger, closeBurger } from '../../assets/js/burger'
import { setDurationTime, initAudio, endAudio } from './player'
import { setDurationTimeDesc, initAudioDesc, endAudioDesc, resetAudioDesc } from './playerDesc'

burgerOpen.onclick = openBurger;
document.onclick = closeBurger;

export let randomBird = getRandomNum();
export let questionIndex = 0;
let gameScore = 0;
let currentScore;
let isWin = false;

function getRandomNum(num = 6) {
  const bird = Math.floor(Math.random() * num); // 0 - num-1
  localStorage.setItem("randomBird", bird);
  return bird;
}

function initLevel() {
  console.log(birdsData[questionIndex][randomBird].name);
  currentScore = 5;
  isWin = false;
  const gameBirdList = document.querySelector(".game-bird__list");
  gameBirdList.textContent = '';
  if (!questionIndex) { resetScore() };

  for (let i = 0; i < 6; i++) {
    const li = document.createElement("li");
    gameBirdList.append(li)
    li.classList.add("game-bird__item");
    li.id = `bird-${i}`;
    const span = document.createElement("span");
    li.prepend(span);
    span.classList.add("game-bird__button");
    li.append(`${birdsData[questionIndex][i].name}`);
  }

  const nextButton = document.querySelector(".game__footer-button");
  nextButton.textContent = "Следующий вопрос";
  if (!nextButton.hasAttribute("disabled")) {
    nextButton.disabled = true;
  }

  const choiceBird = document.querySelectorAll(".game-bird__item");
  choiceBird.forEach(e => e.onclick = checkRandomBird);

  resetLevel();
  const level = document.querySelectorAll(".game__item");
  level[questionIndex].classList.add("game__item_active");

  resetBird();
  resetSolution();

  setDurationTime(randomBird);
}

initLevel();

function resetLevel() {
  const level = document.querySelectorAll(".game__item");
  level.forEach(e => {
    if (e.classList.contains("game__item_active")) {
      e.classList.remove("game__item_active");
    }
  });
}

function resetScore() {
  const score = document.querySelector(".game-random__score");
  score.lastChild.textContent = "0";
  gameScore = 0;
}

function resetBird() {
  const birdName = document.querySelector(".game-random__header");
  birdName.textContent = "* * * * * *";
  const birdImage = document.querySelector(".game-random__image");
  birdImage.style.background = `url('../../assets/images/back.jpg') no-repeat center`;
  birdImage.style.backgroundSize = "cover";
}

resetBird();
resetScore();

export function resetSolution() {
  endAudioDesc();
  resetAudioDesc();
  const birdName = document.querySelector(".game-bird__name");
  birdName.textContent = "Прослушайте голос птицы";
  const birdSubName = document.querySelector(".game-bird__species");
  birdSubName.textContent = "Выберите птицу из списка";
  const birdImage = document.querySelector(".game-bird__image");
  birdImage.style.background = `url('../../assets/images/back-game.jpg') no-repeat center`;
  birdImage.style.backgroundSize = "cover";
  const birdPlayer = document.querySelectorAll(".game-random__player-wrapper");
  birdPlayer[1].classList.add('hidden-block');
  const birdDesc = document.querySelector(".game-bird__description");
  birdDesc.style.overflowY = "hidden";
  birdDesc.textContent = "";
}

export function addSolution(birdChoice) {
  endAudioDesc();
  const birdName = document.querySelector(".game-bird__name");
  birdName.textContent = `${birdsData[questionIndex][birdChoice].name}`;
  const birdSubName = document.querySelector(".game-bird__species");
  birdSubName.textContent = `${birdsData[questionIndex][birdChoice].species}`;
  const birdImage = document.querySelector(".game-bird__image");
  birdImage.style.background = `url('${birdsData[questionIndex][birdChoice].image}') no-repeat center`;
  birdImage.style.backgroundSize = "cover";
  const birdPlayer = document.querySelectorAll(".game-random__player-wrapper");
  birdPlayer[1].classList.remove('hidden-block');
  const birdDesc = document.querySelector(".game-bird__description");
  birdDesc.style.overflowY = "scroll";
  birdDesc.textContent = `${birdsData[questionIndex][birdChoice].description}`;
  birdDesc.classList.remove('hidden-block');
  initAudioDesc();
}

function checkRandomBird(e) {
  let birdNum = e.target.closest(".game-bird__item");
  let birdChoice = birdNum.id.slice(-1);
  localStorage.setItem("chosenBird", birdChoice);
  addSolution(birdChoice);
  setDurationTimeDesc(birdChoice);

  if (birdNum.lastChild.textContent == birdsData[questionIndex][randomBird].name) {
    addWinLevel(birdNum);
    if (questionIndex < 5 && (!isWin)) {
      gameScore += currentScore;
      playTrue();
      endAudio();
      isWin = true;
    } else if (questionIndex == 5 && (!isWin)) {
      gameScore += currentScore;
      playTrue();
      endAudio();
      isWin = true;
      nextButton.onclick = showResult;
      initWin();
      localStorage.setItem("score", gameScore);
    }
  } else if (!isWin) {
    birdNum.firstChild.classList.add("_error");
    currentScore--;
    playFalse();
  }
  const score = document.querySelector(".game-random__score");
  score.lastChild.textContent = `${gameScore}`;
}

const nextButton = document.querySelector(".game__footer-button");
nextButton.onclick = function() {
  questionIndex = (questionIndex < 5) ? ++questionIndex : 0;
  randomBird = getRandomNum();
  initLevel();
  endAudio();
  endAudioDesc();
};

function addWinLevel(birdNum) {
  const choiceBird = document.querySelectorAll(".game-bird__item");
  birdNum.firstChild.classList.add("_success");
  const nextButton = document.querySelector(".game__footer-button");
  nextButton.removeAttribute("disabled");
  const birdName = document.querySelector(".game-random__header");
  birdName.textContent = `${birdsData[questionIndex][randomBird].name}`;
  const birdImage = document.querySelector(".game-random__image");
  birdImage.style.background = `url('${birdsData[questionIndex][randomBird].image}') no-repeat center`;
  birdImage.style.backgroundSize = "cover";
}

function showResult() {
  window.location.href = "result.html";
}

function initWin() {
  const nextButton = document.querySelector(".game__footer-button");
  nextButton.textContent = "Результат";
}

function playFalse() {
  let audio = new Audio();
  audio.src = '../../assets/sounds/false.mp3';
  audio.play();
}

function playTrue() {
  let audio = new Audio();
  audio.src = '../../assets/sounds/true.mp3';
  audio.play();
}

initAudio();