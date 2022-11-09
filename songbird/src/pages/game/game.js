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
  // return Math.floor(Math.random() * num + 1);
  return Math.floor(Math.random() * num);
}

function initBirdItem(questionIndex = 0) {
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
}

initBirdItem();

function initGameRandom() {
  const birdName = document.querySelector(".game-random__header");
  birdName.textContent = "* * * * * *";
  const score = document.querySelector(".game-random__score");
  score.lastChild.textContent = "0";
}

initGameRandom();

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

function checkRandomBird(e) {
  let birdNum = e.target.closest(".game-bird__item");

  if (!birdNum) { return; }

  if (birdNum.lastChild.textContent == birdsData[questionIndex][randomBird].name) {
    console.log('true');
    choiceBird.onclick = null;
    birdNum.firstChild.classList.add("_success");
    const nextButton = document.querySelector(".game__footer-button");
    nextButton.removeAttribute("disabled");
    const birdName = document.querySelector(".game-random__header");
    birdName.textContent = `${birdsData[questionIndex][randomBird].name}`;
    gameScore += currentScore;
    currentScore = 5;
    const score = document.querySelector(".game-random__score");
    score.lastChild.textContent = `${gameScore}`;
    questionIndex++;
  } else {
    console.log('false');
    birdNum.firstChild.classList.add("_error");
    currentScore--;
  }
}

const choiceBird = document.querySelectorAll(".game-bird__item");
choiceBird.forEach(e => e.onclick = checkRandomBird);
