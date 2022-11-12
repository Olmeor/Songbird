import '../../assets/styles/fonts.css'
import '../../assets/styles/normalize.css'
import '../../assets/styles/body.css'
import '../../assets/styles/header.css'
import '../../assets/styles/footer.css'

import { burgerOpen, openBurger, closeBurger } from '../../assets/js/burger'
// import { gameScore, winGame } from '../game/game'

burgerOpen.onclick = openBurger;
document.onclick = closeBurger;


// console.log(winGame)
// (function checkWin() {
//   if (winGame) {
//     playWin();
//   }
// }());

// function playWin() {
//   let audio = new Audio();
//   audio.src = '../../assets/sounds/win.mp3';
//   audio.play();
// }