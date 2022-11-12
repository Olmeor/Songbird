import birdsData from '../../assets/js/birds'
import { questionIndex, randomBird } from './game';

export function setDurationTime(audioDurationTime, bird) {
  // const audioDurationTime = document.querySelector(".play-duration-time");

  let audio = new Audio();
  audio.src = `${birdsData[questionIndex][bird].audio}`;

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