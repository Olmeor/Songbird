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

let outputScore;
console.log(outputScore)

export function changeOutputScore(score) {
  outputScore = score;
  console.log(outputScore)
  showWin();
}

export function showWin() {
  console.log(outputScore);
  if (!outputScore) {
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
}

// showWin();
function playWin() {
  let audio = new Audio();
  audio.src = '../../assets/sounds/win.mp3';
  audio.play();
}