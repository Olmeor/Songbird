import birdsData from '../../assets/js/birds'
import { questionIndex } from './game';

let isPlayDesc = false;
let currentTimeValueDesc = 0;
let currentVolumeDesc;
const audioDesc = new Audio();

function playAudioDesc() {
  let bird = localStorage.getItem("chosenBird")
  const audioVolume = document.querySelector(".player-2 .vol-line");

  audioDesc.src = `${birdsData[questionIndex][bird].audio}`;
  audioDesc.currentTime = currentTimeValueDesc;
  if (!isPlayDesc) {
    isPlayDesc = true;
    audioDesc.play();
    audioDesc.volume = audioVolume.value/100;
    setCurrentTimeDesc();
  } else {
    isPlayDesc = false;
    audioDesc.pause();
  }
}

export function setDurationTimeDesc(bird = localStorage.getItem("chosenBird")) {
  let audioDesc = new Audio();
  audioDesc.src = `${birdsData[questionIndex][bird].audio}`;
  const audioDurationTime = document.querySelector(`.player-2 .play-duration-time`);

  audioDesc.onloadedmetadata = function() {
    let duration = audioDesc.duration;
    audioDurationTime.textContent = convertTimeDesc(Math.round(duration));
  };
}

function convertTimeDesc(duration) {
  let minutes, seconds, minutesString, secondsString;
  minutes = Math.floor(duration / 60);
  seconds = Math.floor(duration % 60);
  minutesString = (minutes < 10) ? "0" + String(minutes) : String(minutes);
  secondsString = (seconds < 10) ? "0" + String(seconds) : String(seconds);
  return `${minutesString}:${secondsString}`;
}

function setCurrentTimeDesc() {
  const audioCurrentTime = document.querySelector(".player-2 .play-current-time");
  audioCurrentTime.textContent = convertTimeDesc(currentTimeValueDesc);
  setTimeout(setCurrentTimeDesc, 500);
}

function toggleButtonDesc() {
  const audioPlayButton = document.querySelector(".player-2 .play");
  audioPlayButton.classList.toggle("pause");
}

function muteAudioDesc() {
  const audioVolume = document.querySelector(".player-2 .vol-line");
  const volumeButton = document.querySelector(".player-2 .vol-mute");
  if (audioVolume.value > 0) {
      currentVolumeDesc = audioVolume.value;
      audioVolume.value = 0;
      volumeButton.classList.add("mute-icon");
      setValueDesc();
  } else {
      audioVolume.value = currentVolumeDesc;
      volumeButton.classList.remove("mute-icon");
      setValueDesc();
  }
}

function setValueDesc() {
  const audioVolume = document.querySelector(".player-2 .vol-line");
  audioDesc.volume = audioVolume.value / 100;
}

function setProgressDesc(e) {
  let bird = localStorage.getItem("chosenBird");
  audioDesc.src = `${birdsData[questionIndex][bird].audio}`;
  let audioDuration
  const audioDurationTime = document.querySelector(".player-2 .play-duration-time");
  const audioProgress = document.querySelector(".player-2 .progress-bar");
  const audioCurrentTime = document.querySelector(".player-2 .play-current-time");

  let promise = new Promise(function() {
    audioDesc.onloadedmetadata = function() {
      audioDuration = audioDesc.duration;
      let duration;
      audioDesc.currentTime = (e.target.value / 100) * audioDesc.duration
      audioDuration = audioDesc.duration;
      audioDurationTime.textContent = convertTimeDesc(Math.round(audioDuration));
      setTimeout(setCurrentTimeDesc, 500);
      duration = audioDuration;
    };
  });
  promise.then(
    (function () {
      audioDesc.currentTime = currentTimeValueDesc;
      if (!isPlayDesc) {
        isPlayDesc = true;
        toggleButtonDesc();
        const audioVolume = document.querySelector(".player-2 .vol-line");
        audioDesc.volume = audioVolume.value/100;
      };
      audioDesc.play();
    }())
  );
}

function renewProgressDesc(e) {
  const {currentTime, duration} = e.target;
  const currentValue = currentTime / duration * 100;
  const audioProgress = document.querySelector(".player-2 .progress-bar");
  if (!isNaN(currentValue))  {
      currentTimeValueDesc = currentTime;
      audioProgress.value = currentValue;
  }
}

export function endAudioDesc() {
  const audioPlayButton = document.querySelector(".player-2 .play");
  if (audioPlayButton.classList.contains("pause")) {
    toggleButtonDesc();
  }
  isPlayDesc = false;
  currentTimeValueDesc = 0;
  audioDesc.currentTime = 0;
  audioDesc.pause();
}

export function initAudioDesc() {
  const audioPlayButton = document.querySelector(".player-2 .play");
  const volumeButton = document.querySelector(".player-2 .vol-mute");
  const audioProgress = document.querySelector(".player-2 .progress-bar");
  const audioVolume = document.querySelector(".player-2 .vol-line");

  audioPlayButton.onclick = function() {
    playAudioDesc();
    toggleButtonDesc();
  }
  volumeButton.onclick = muteAudioDesc;
  audioVolume.onchange = setValueDesc;
  audioProgress.onchange = setProgressDesc;
  audioDesc.ontimeupdate = renewProgressDesc;
  audioDesc.onended = endAudioDesc;
}

export function resetAudioDesc() {
  const audioPlayButton = document.querySelector(".player-2 .play");
  const volumeButton = document.querySelector(".player-2 .vol-mute");
  const audioProgress = document.querySelector(".player-2 .progress-bar");
  const audioVolume = document.querySelector(".player-2 .vol-line");

  audioPlayButton.onclick = null;
  volumeButton.onclick = null;
  audioVolume.onchange = null;
  audioProgress.onchange = null;
  audioDesc.ontimeupdate = null;
  audioDesc.onended = null;
}