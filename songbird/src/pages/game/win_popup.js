import { initLevel, gameScore } from './game'

export function winPopupOpen() {
  // popup.classList.add("hidden-block");
  const popup = document.createElement('div');
  const gameRandom = document.querySelector(".game-random");
  popup.classList.add("game-popup");
  gameRandom.prepend(popup);
  const img = document.createElement('img');
  img.classList.add("game-popup__img");
  img.style.background = `url('../../assets/images/back-game.jpg') no-repeat center`;
  img.style.backgroundSize = "contain";
  popup.prepend(img);
  const header = document.createElement('h2');
  header.classList.add("game-popup__header");
  header.textContent = "Поздравляем!";
  popup.append(header);
  const paragraph = document.createElement('p');
  paragraph.classList.add("game-popup__paragraph");
  paragraph.textContent = `Вы прошли викторину и набрали ${gameScore} из 30 возможных баллов!`
  popup.append(paragraph);
  const button = document.createElement('button');
  button.classList.add("game__popup-button");
  button.textContent = "Попробовать еще раз"
  popup.append(button);
  button.onclick = () => {
    initLevel();
    winPopupClose();
  };
}

export function winPopupClose() {
  const popup = document.querySelector(".game-popup");
  if (popup) {
    popup.remove();
  }
}