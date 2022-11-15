import birdsData from '../../assets/js/birds'

let isPlayPopup = false;
let currentTimeValuePopup = 0;
let currentVolumePopup;
const audioPopup = new Audio();

function playAudioPopup() {
  let bird = localStorage.getItem("galleryBird")
  const audioVolume = document.querySelector(".player-popup .vol-line");

  audioPopup.src = `${birdsData.flat()[bird].audio}`;
  audioPopup.currentTime = currentTimeValuePopup;
  if (!isPlayPopup) {
    isPlayPopup = true;
    audioPopup.play();
    audioPopup.volume = audioVolume.value/100;
    setCurrentTimePopup();
  } else {
    isPlayPopup = false;
    audioPopup.pause();
  }
}

export function setDurationTimePopup(bird = localStorage.getItem("galleryBird")) {
  let audioPopup = new Audio();
  audioPopup.src = `${birdsData.flat()[bird].audio}`;
  const audioDurationTime = document.querySelector(`.player-popup .play-duration-time`);

  audioPopup.onloadedmetadata = function() {
    let duration = audioPopup.duration;
    audioDurationTime.textContent = convertTimePopup(Math.round(duration));
  };
}

function convertTimePopup(duration) {
  let minutes, seconds, minutesString, secondsString;
  minutes = Math.floor(duration / 60);
  seconds = Math.floor(duration % 60);
  minutesString = (minutes < 10) ? "0" + String(minutes) : String(minutes);
  secondsString = (seconds < 10) ? "0" + String(seconds) : String(seconds);
  return `${minutesString}:${secondsString}`;
}

function setCurrentTimePopup() {
  const audioCurrentTime = document.querySelector(".player-popup .play-current-time");
  audioCurrentTime.textContent = convertTimePopup(currentTimeValuePopup);
  setTimeout(setCurrentTimePopup, 500);
}

function toggleButtonPopup() {
  const audioPlayButton = document.querySelector(".player-popup .play");
  audioPlayButton.classList.toggle("pause");
}

function muteAudioPopup() {
  const audioVolume = document.querySelector(".player-popup .vol-line");
  const volumeButton = document.querySelector(".player-popup .vol-mute");
  if (audioVolume.value > 0) {
      currentVolumePopup = audioVolume.value;
      audioVolume.value = 0;
      volumeButton.classList.add("mute-icon");
      setValuePopup();
  } else {
      audioVolume.value = currentVolumePopup;
      volumeButton.classList.remove("mute-icon");
      setValuePopup();
  }
}

function setValuePopup() {
  const audioVolume = document.querySelector(".player-popup .vol-line");
  audioPopup.volume = audioVolume.value / 100;
}

function setProgressPopup(e) {
  let bird = localStorage.getItem("galleryBird");
  audioPopup.src = `${birdsData.flat()[bird].audio}`;
  let audioDuration
  const audioDurationTime = document.querySelector(".player-popup .play-duration-time");

  let promise = new Promise(function() {
    audioPopup.onloadedmetadata = function() {
      audioDuration = audioPopup.duration;
      let duration;
      audioPopup.currentTime = (e.target.value / 100) * audioPopup.duration
      audioDuration = audioPopup.duration;
      audioDurationTime.textContent = convertTimePopup(Math.round(audioDuration));
      setTimeout(setCurrentTimePopup, 500);
      duration = audioDuration;
    };
  });
  promise.then(
    (function () {
      audioPopup.currentTime = currentTimeValuePopup;
      if (!isPlayPopup) {
        isPlayPopup = true;
        toggleButtonPopup();
        const audioVolume = document.querySelector(".player-popup .vol-line");
        audioPopup.volume = audioVolume.value/100;
      };
      audioPopup.play();
    }())
  );
}

function renewProgressPopup(e) {
  const {currentTime, duration} = e.target;
  const currentValue = currentTime / duration * 100;
  const audioProgress = document.querySelector(".player-popup .progress-bar");
  if (!isNaN(currentValue))  {
      currentTimeValuePopup = currentTime;
      audioProgress.value = currentValue;
  }
}

export function endAudioPopup() {
  const audioPlayButton = document.querySelector(".player-popup .play");
  if (audioPlayButton.classList.contains("pause")) {
    toggleButtonPopup();
  }
  isPlayPopup = false;
  currentTimeValuePopup = 0;
  audioPopup.currentTime = 0;
  audioPopup.pause();
}

export function initAudioPopup() {
  const audioPlayButton = document.querySelector(".player-popup .play");
  const volumeButton = document.querySelector(".player-popup .vol-mute");
  const audioProgress = document.querySelector(".player-popup .progress-bar");
  const audioVolume = document.querySelector(".player-popup .vol-line");

  audioPlayButton.onclick = function() {
    playAudioPopup();
    toggleButtonPopup();
  }
  volumeButton.onclick = muteAudioPopup;
  audioVolume.onchange = setValuePopup;
  audioProgress.onchange = setProgressPopup;
  audioPopup.ontimeupdate = renewProgressPopup;
  audioPopup.onended = endAudioPopup;
}

export function resetAudioPopup() {
  const audioPlayButton = document.querySelector(".player-popup .play");
  const volumeButton = document.querySelector(".player-popup .vol-mute");
  const audioProgress = document.querySelector(".player-popup .progress-bar");
  const audioVolume = document.querySelector(".player-popup .vol-line");

  audioPlayButton.onclick = null;
  volumeButton.onclick = null;
  audioVolume.onchange = null;
  audioProgress.onchange = null;
  audioPopup.ontimeupdate = null;
  audioPopup.onended = null;
}