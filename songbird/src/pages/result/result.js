import '../../assets/styles/fonts.css'
import '../../assets/styles/normalize.css'
import '../../assets/styles/body.css'
import '../../assets/styles/header.css'
import '../../assets/styles/footer.css'
import './result.css'

import { burgerOpen, openBurger, closeBurger } from '../../assets/js/burger'
// import { gameScore } from '../game/game'

burgerOpen.onclick = openBurger;
document.onclick = closeBurger;

let outputScore = (localStorage.getItem("score")) ? (localStorage.getItem("score")) : 0;

export function showWin() {
  if (!(+outputScore)) {
    return;
  }

  const header = document.querySelector(".result__header");
  header.textContent = "Поздравляем!";
  const paragraph = document.querySelector(".result__paragraph");
  paragraph.textContent = `Вы прошли викторину и набрали ${outputScore} из 30 возможных баллов!`
  const button = document.querySelector(".result__button");
  button.textContent = "Начать заново"
  playWin();
  outputScore = 0;
  localStorage.setItem("score", 0);
}

showWin();

function playWin() {
  let audio = new Audio();
  audio.src = '../../assets/sounds/win.mp3';
  audio.play();
}