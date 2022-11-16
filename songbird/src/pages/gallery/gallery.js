import '../../assets/styles/fonts.css'
import '../../assets/styles/normalize.css'
import '../../assets/styles/body.css'
import '../../assets/styles/header.css'
import '../../assets/styles/footer.css'
import '../game/player.css'
import './gallery.css'

import birdsData from '../../assets/js/birds'
import { burgerOpen, openBurger, closeBurger } from './burgerPopup'
import { setDurationTimePopup, initAudioPopup, endAudioPopup, resetAudioPopup } from './playerPopup'

burgerOpen.onclick = openBurger;
document.onclick = closeBurger;

const initBirdsArray = () => {
  let arr = [];

  for (let i = 0; i < birdsData.flat().length; i++) {
		arr[i] =
		`
    <div id="bird_${i}" class="gallery__bird">
      <div class="gallery__border">
        <div class="gallery__image"></div>
      </div>
      <div class="gallery__title">${birdsData.flat()[i].name}</div>
    </div>
		`;
	}
	return arr;
};

let arrBirds = initBirdsArray();

const initGalleryLayout = () => {
  let gallery = document.querySelector(".gallery__wrapper");

  for (let i = 0; i < arrBirds.length; i++) {
    gallery.innerHTML += arrBirds[i];
	}
};

initGalleryLayout();

const addBirdsImage = () => {
  const birds = document.querySelectorAll(".gallery__image");

  for (let i = 0; i < arrBirds.length; i++) {
    birds[i].style.background = `url('${birdsData.flat()[i].image}') no-repeat center`;
    birds[i].style.backgroundSize = "cover";
	}
};

addBirdsImage();

const birds = document.querySelectorAll(".gallery__image");
birds.forEach(e => e.onclick = openPopup);

export function openPopup(e) {
  let birdNum = e.target.closest(".gallery__bird");
  let birdChoice = birdNum.id.slice(5);
  let BirdID = `bird_${birdChoice}`;
  // const popup = document.querySelector('.gallery__popup');
  const bodyShadow = document.querySelector('.body__shadow');
  bodyShadow.classList.add('_active')
  // popup.classList.remove('hidden-block');
  addLayoutPopup(BirdID);
  addPopup(birdChoice);
  setDurationTimePopup(birdChoice);
}

function resetPopup() {
  endAudioPopup();
  resetAudioPopup();
}

function addLayoutPopup(BirdID) {
  const bird = document.getElementById(`${BirdID}`);
  const popup = document.createElement('div');
  popup.classList.add("gallery__popup");
  bird.prepend(popup);
  popup.innerHTML +=
  `
  <div class="game-bird__inner">
    <div class="gallery__popup_close"></div>
    <div class="game-bird__container">
      <div class="game-bird__image"></div>
      <div class="game-bird__title">
        <p class="game-bird__name"></p>
        <p class="game-bird__species"></p>
      </div>
    </div>
    <div class="game-random__player-wrapper player-popup">
      <div class="game-random__player-control">
        <button class="play player-icon"></button>
        <input class="progress-bar progress-style" type="range" min="0" max="100" value="0">
      </div>
      <div class="play-time">
        <div class="play-current-time">00:00</div>
        <div class="play-duration-time">00:00</div>
      </div>
      <div class="game-random__player-volume">
        <button class="vol-mute player-icon"></button>
        <input class="vol-line progress-style" type="range" min="0" max="100" value="10">
      </div>
    </div>
    <div class="game-bird__description"></div>
  </div>
  `;
}

function addPopup(birdChoice) {
  endAudioPopup();
  localStorage.setItem("galleryBird", birdChoice);
  const birdName = document.querySelector(".game-bird__name");
  birdName.textContent = `${birdsData.flat()[birdChoice].name}`;
  const birdSubName = document.querySelector(".game-bird__species");
  birdSubName.textContent = `${birdsData.flat()[birdChoice].species}`;
  const birdImage = document.querySelector(".game-bird__image");
  birdImage.style.background = `url('${birdsData.flat()[birdChoice].image}') no-repeat center`;
  birdImage.style.backgroundSize = "cover";
  const birdPopup = document.querySelector(".game-bird__description");
  birdPopup.textContent = `${birdsData.flat()[birdChoice].description}`;
  initAudioPopup();
}

export function closePopup(e) {
  const popup = document.querySelector('.gallery__popup');
  // const popup = document.getElementById(`${BirdID}`);
  const bodyShadow = document.querySelector('.body__shadow');
  bodyShadow.classList.remove('_active');
  resetPopup();
  if (popup) {
    // popup.classList.add('hidden-block');
    popup.remove();
  }
}
