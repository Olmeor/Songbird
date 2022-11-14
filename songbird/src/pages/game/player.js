import birdsData from '../../assets/js/birds'
import { questionIndex, randomBird } from './game';

let isPlay = false;
let currentTimeValue = 0;
let currentVolume;
const audio = new Audio();

function playAudio(event, player = "player-1", bird = localStorage.getItem("randomBird")) {
  // const audio = new Audio();
  const audioVolume = document.querySelector(`.${player} .vol-line`);

  audio.src = `${birdsData[questionIndex][bird].audio}`;
  audio.currentTime = currentTimeValue;
  // setDurationTime(player, bird);
  if (!isPlay) {
    isPlay = true;
    audio.play();
    audio.volume = audioVolume.value/100;
    setCurrentTime(player);
  } else {
    isPlay = false;
    audio.pause();
  }
}

export function setDurationTime(player = "player-1", bird = localStorage.getItem("randomBird")) {
  let audio = new Audio();
  audio.src = `${birdsData[questionIndex][bird].audio}`;
  const audioDurationTime = document.querySelector(`.${player} .play-duration-time`);

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

function setCurrentTime(player = "player-1") {
  if (player) {
    localStorage.setItem("player", player);
  }
  let newPlayer = localStorage.getItem("player");
  const audioCurrentTime = document.querySelector(`.${newPlayer} .play-current-time`);
  audioCurrentTime.textContent = convertTime(currentTimeValue);
  setTimeout(setCurrentTime, 500);
}

function toggleButton(event, player = "player-1") {
  const audioPlayButton = document.querySelector(`.${player} .play`);
  audioPlayButton.classList.toggle("pause");
}

function muteAudio(event, player = "player-1") {
  const audioVolume = document.querySelector(`.${player} .vol-line`);
  const volumeButton = document.querySelector(`.${player} .vol-mute`);
  if (audioVolume.value > 0) {
      currentVolume = audioVolume.value;
      audioVolume.value = 0;
      volumeButton.classList.add("mute-icon");
      setValue(player);
  } else {
      audioVolume.value = currentVolume;
      volumeButton.classList.remove("mute-icon");
      setValue(player);
  }
}

function setValue(event, player = "player-1") {
  // const audio = new Audio();
  const audioVolume = document.querySelector(`.${player} .vol-line`);
  audio.volume = audioVolume.value / 100;
}

// function setProgress(event, player = "player-1") {
//   const audioDuration = audio.duration;
//   const audioProgress = document.querySelector(`.${player} .progress-bar`);
//   if (!isNaN(audioDuration)) {
//     audio.currentTime = audioProgress.value / 100 * audioDuration;
//   }
//   audio.addEventListener('timeupdate', renewProgress);
// }

function setProgress(event, player = "player-1") {
  let bird = localStorage.getItem("randomBird");
  audio.src = `${birdsData[questionIndex][bird].audio}`;
  let audioDuration
  const audioDurationTime = document.querySelector(`.${player} .play-duration-time`);
  const audioProgress = document.querySelector(`.${player} .progress-bar`);
  const audioCurrentTime = document.querySelector(`.${player} .play-current-time`);
  console.log("audio.currentTime", audio.currentTime)
  console.log("audioDuration",audioDuration)
  console.log("event",event.target.value)
  
  let promise = new Promise(function(resolve, reject) {
    audio.onloadedmetadata = function() {
      console.log(2222, player)
      audioDuration = audio.duration;
      let duration;
      audio.currentTime = (event.target.value/100)*audio.duration
      console.log(audioDuration, audioProgress)
      audioDuration = audio.duration;
      audioDurationTime.textContent = convertTime(Math.round(audioDuration));
      console.log("audioCurrentTime",audioCurrentTime)
      setTimeout(setCurrentTime, 500);
      console.log("convertTime(Math.round(audio.currentTime))",convertTime(Math.round(audio.currentTime)))
      console.log("audioDuration",audioDuration)
      duration = audioDuration;
    };
  });
  promise.then(
    (function () {
      audio.currentTime = currentTimeValue;
      if (!isPlay) {
        isPlay = true;
        toggleButton();
        const audioVolume = document.querySelector(`.${player} .vol-line`);
        audio.volume = audioVolume.value/100;
      };
      audio.play();
    }())
  );
}

function renewProgress(elem, player = "player-1") {
  const {currentTime, duration} = elem.target;
  const currentValue = currentTime / duration * 100;
  const audioProgress = document.querySelector(`.${player} .progress-bar`);
  if (!isNaN(currentValue))  {
      currentTimeValue = currentTime;
      audioProgress.value = currentValue;
  }
}

export function initAudio(player) {
  // const audio = new Audio();
  const audioPlayButton = document.querySelector(`.${player} .play`);
  const volumeButton = document.querySelector(`.${player} .vol-mute`);
  const audioProgress = document.querySelector(`.${player} .progress-bar`);
  const audioVolume = document.querySelector(`.${player} .vol-line`);

  audioPlayButton.addEventListener('click', playAudio);
  audioPlayButton.addEventListener('click', toggleButton);
  volumeButton.addEventListener('click', muteAudio);
  audioVolume.addEventListener('change', setValue);
  audioProgress.addEventListener('change', setProgress);
  audio.addEventListener('timeupdate', renewProgress);
  // audioProgress.oninput = function() {
  //   audio.removeEventListener('timeupdate', renewProgress);
  // }
  audio.addEventListener('ended', toggleButton);
}