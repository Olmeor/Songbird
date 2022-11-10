import '../../assets/styles/fonts.css'
import '../../assets/styles/normalize.css'
import '../../assets/styles/body.css'
import '../../assets/styles/header.css'
import '../../assets/styles/footer.css'
import './game.css'
import './player.css'

import birdsData from '../../assets/js/birds'

import { burgerOpen, openBurger, closeBurger } from '../../assets/js/burger'

burgerOpen.onclick = openBurger;
document.onclick = closeBurger;



let randomBird = getRandomNum();
let questionIndex = 0;
let gameScore = 0;
let currentScore = 5;

function getRandomNum(num = 6) {
  // return Math.floor(Math.random() * num + 1); // 1 - num
  return Math.floor(Math.random() * num); // 0 - num-1
}

function initLevel() {
  const gameBirdList = document.querySelector(".game-bird__list");
  gameBirdList.textContent = '';

  for (let i = 0; i < 6; i++) {
    const li = document.createElement("li");
    gameBirdList.append(li)
    li.classList.add("game-bird__item");
    const span = document.createElement("span");
    li.prepend(span);
    span.classList.add("game-bird__button");
    li.append(`${birdsData[questionIndex][i].name}`);
  }

  const nextButton = document.querySelector(".game__footer-button");
  if (!nextButton.hasAttribute("disabled")) {
    nextButton.disabled = true;
  }

  const choiceBird = document.querySelectorAll(".game-bird__item");
  choiceBird.forEach(e => e.onclick = checkRandomBird);

  resetLevel();
  const level = document.querySelectorAll(".game__item");
  level[questionIndex].classList.add("game__item_active");

  resetBird();
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

function checkRandomBird(e) {
  let birdNum = e.target.closest(".game-bird__item");

  if (!birdNum) { return; }

  if (birdNum.lastChild.textContent == birdsData[questionIndex][randomBird].name) {
    console.log('true');
    const choiceBird = document.querySelectorAll(".game-bird__item");
    choiceBird.forEach(e => e.onclick = null);
    birdNum.firstChild.classList.add("_success");
    const nextButton = document.querySelector(".game__footer-button");
    nextButton.removeAttribute("disabled");
    const birdName = document.querySelector(".game-random__header");
    birdName.textContent = `${birdsData[questionIndex][randomBird].name}`;
    const birdImage = document.querySelector(".game-random__image");
    birdImage.style.background = `url('${birdsData[questionIndex][randomBird].image}') no-repeat center`;
    birdImage.style.backgroundSize = "cover";
    gameScore += currentScore;
    currentScore = 5;
    const score = document.querySelector(".game-random__score");
    score.lastChild.textContent = `${gameScore}`;
    if (questionIndex < 5) {
      questionIndex+= 5;
    } else {
      initWin();
    }
    // playTrue();
    randomBird = getRandomNum();
  } else {
    console.log('false');
    birdNum.firstChild.classList.add("_error");
    currentScore--;
    // playFalse();
  }
}

const nextButton = document.querySelector(".game__footer-button");
nextButton.onclick = initLevel;

function initWin () {
  const nextButton = document.querySelector(".game__footer-button");
  nextButton.textContent = "Новая игра";
  questionIndex = 0;
}


// Player

function setDurationTime() {
  const audioDurationTime = document.querySelector(".play-duration-time");

  let audio = new Audio();
  audio.src = `${birdsData[questionIndex][randomBird].audio}`;

  audio.onloadedmetadata = function() {
    let duration = audio.duration;
    audioDurationTime.textContent = convertTime(Math.round(duration));
  };
}

function convertTime(duration) {
  let minutes, seconds, minutesString, secondsString;
  minutes = Math.floor(duration / 60);
  seconds = Math.floor(duration % 60);
  minutesString = (minutes < 10) ? "0" + String(minutes) : String(minutes);
  secondsString = (seconds < 10) ? "0" + String(seconds) : String(seconds);
  return `${minutesString}:${secondsString}`;
}

setDurationTime();

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