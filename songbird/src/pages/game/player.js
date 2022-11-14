import birdsData from '../../assets/js/birds'
import { questionIndex, randomBird } from './game';

let isPlay = false;
let currentTimeValue = 0;
let currentVolume;
const audio = new Audio();

function playAudio() {
  let bird = localStorage.getItem("randomBird")
  const audioVolume = document.querySelector(".player-1 .vol-line");

  audio.src = `${birdsData[questionIndex][bird].audio}`;
  audio.currentTime = currentTimeValue;
  if (!isPlay) {
    isPlay = true;
    audio.play();
    audio.volume = audioVolume.value/100;
    setCurrentTime();
  } else {
    isPlay = false;
    audio.pause();
  }
}

export function setDurationTime(bird = localStorage.getItem("randomBird")) {
  let audio = new Audio();
  audio.src = `${birdsData[questionIndex][bird].audio}`;
  const audioDurationTime = document.querySelector(`.player-1 .play-duration-time`);

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

function setCurrentTime() {
  const audioCurrentTime = document.querySelector(".player-1 .play-current-time");
  audioCurrentTime.textContent = convertTime(currentTimeValue);
  setTimeout(setCurrentTime, 500);
}

function toggleButton() {
  const audioPlayButton = document.querySelector(".player-1 .play");
  audioPlayButton.classList.toggle("pause");
}

function muteAudio() {
  const audioVolume = document.querySelector(".player-1 .vol-line");
  const volumeButton = document.querySelector(".player-1 .vol-mute");
  if (audioVolume.value > 0) {
      currentVolume = audioVolume.value;
      audioVolume.value = 0;
      volumeButton.classList.add("mute-icon");
      setValue();
  } else {
      audioVolume.value = currentVolume;
      volumeButton.classList.remove("mute-icon");
      setValue();
  }
}

function setValue() {
  // const audio = new Audio();
  const audioVolume = document.querySelector(".player-1 .vol-line");
  audio.volume = audioVolume.value / 100;
}

function setProgress(e) {
  let bird = localStorage.getItem("randomBird");
  audio.src = `${birdsData[questionIndex][bird].audio}`;
  let audioDuration
  const audioDurationTime = document.querySelector(".player-1 .play-duration-time");
  const audioProgress = document.querySelector(".player-1 .progress-bar");
  const audioCurrentTime = document.querySelector(".player-1 .play-current-time");

  let promise = new Promise(function() {
    audio.onloadedmetadata = function() {
      audioDuration = audio.duration;
      let duration;
      audio.currentTime = (e.target.value/100)*audio.duration
      audioDuration = audio.duration;
      audioDurationTime.textContent = convertTime(Math.round(audioDuration));
      setTimeout(setCurrentTime, 500);
      duration = audioDuration;
    };
  });
  promise.then(
    (function () {
      audio.currentTime = currentTimeValue;
      if (!isPlay) {
        isPlay = true;
        toggleButton();
        const audioVolume = document.querySelector(".player-1 .vol-line");
        audio.volume = audioVolume.value/100;
      };
      audio.play();
    }())
  );
}

function renewProgress(e) {
  const {currentTime, duration} = e.target;
  const currentValue = currentTime / duration * 100;
  const audioProgress = document.querySelector(".player-1 .progress-bar");
  if (!isNaN(currentValue))  {
      currentTimeValue = currentTime;
      audioProgress.value = currentValue;
  }
}

export function endAudio() {
  isPlay = false;
  currentTimeValue = 0;
  toggleButton();
  audio.currentTime = 0;
  audio.pause();
}

export function initAudio() {
  const audioPlayButton = document.querySelector(".player-1 .play");
  const volumeButton = document.querySelector(".player-1 .vol-mute");
  const audioProgress = document.querySelector(".player-1 .progress-bar");
  const audioVolume = document.querySelector(".player-1 .vol-line");

  audioPlayButton.onclick = function() {
    playAudio();
    toggleButton();
  }
  volumeButton.onclick = muteAudio;
  audioVolume.onchange = setValue;
  audioProgress.onchange = setProgress;
  audio.ontimeupdate = renewProgress;
  audio.onended = endAudio;
}