import birdsDataRU from '../../assets/js/birds'
import birdsDataEN from '../../assets/js/birds-en'

export let birdsData;
export const flag = document.querySelector(".footer__flag");

export let lang;
export const setLang = () => {
  lang = (localStorage.getItem("language")) ? localStorage.getItem("language") : "ru";
}
setLang();

export function changeLang() {
  if (lang == "ru") {
    lang = "en";
    localStorage.setItem("language", "en");
  } else {
    lang = "ru";
    localStorage.setItem("language", "ru");
  }
}

export const translation = {
  ru: {
    about: "Об игре",
    quiz: "Викторина",
    result: "Результат",
    gallery: "Галерея",
    galleryHeader: "Нажмите на изображение, чтобы увидеть дополнительную информацию",
    resultHeader: "Приветствуем!",
    resultWinHeader: "Поздравляем!",
    resultParagraph: `Пока здесь ничего нет. Нажмите кнопку "Начать викторину"!`,
    resultWinParagraph: `Вы прошли викторину и набрали <span class="result__score"></span> из 30 возможных баллов!`,
    resultButton: "Начать викторину",
    resultWinButton: "Начать заново",
    levels: ["Разминка", "Воробьиные", "Лесные птицы", "Певчие птицы", "Хищные птицы", "Морские птицы"],
    listenVoice: "Прослушайте голос птицы",
    choiceBird: "Выберите птицу из списка",
    nextQuestion: "Следующий вопрос",
    nextResult: "Результат",
    gameOver: "Игра окончена",
  },

  en: {
    about: "About",
    quiz: "Quiz",
    result: "Result",
    gallery: "Gallery",
    galleryHeader: "Click to image for see more information",
    resultHeader: "Greeting!",
    resultWinHeader: "Congratulations!",
    resultParagraph: `There's nothing here. Click the "Start Quiz" button!`,
    resultWinParagraph: `You passed the quiz and scored <span class="result__score"></span> out of 30 possible points!`,
    resultButton: "Start Quiz",
    resultWinButton: "Start over",
    levels: ["Warm-up", "Sparrows", "Forest Birds", "Singing Birds", "Predator birds", "Sea birds"],
    listenVoice: "Listen to the bird's voice",
    choiceBird: "Select a bird from the list",
    nextQuestion: "Next question",
    nextResult: "Result",
    gameOver: "Game over",
  },
};


export function setBirdsData() {
  birdsData = (lang == "ru") ? birdsDataRU : birdsDataEN;
}

export function translateHeader() {
  const nav = document.querySelectorAll(".header__link");
  nav[0].textContent = translation[lang].about;
  nav[1].textContent = translation[lang].quiz;
  nav[2].textContent = translation[lang].result;
  nav[3].textContent = translation[lang].gallery;
}

export function translateGalleryPage() {
  const galleryHeader = document.querySelector(".gallery__header");
  galleryHeader.textContent = translation[lang].galleryHeader;
  setBirdsData();
  const galleryTitle = document.querySelectorAll(".gallery__title");
  for (let i = 0; i < birdsData.flat().length; i++) {
    galleryTitle[i].textContent = birdsData.flat()[i].name;
  }
}

export function setFlag() {
  if (lang == "ru" && flag.classList.contains("ru-flag")) {
    flag.classList.remove("ru-flag");
    flag.classList.add("en-flag");
  } else if (lang == "en" && flag.classList.contains("en-flag")) {
    flag.classList.remove("en-flag");
    flag.classList.add("ru-flag");
  }
}

export function toggleFlag() {
  if ((flag.classList.contains("ru-flag"))) {
    flag.classList.remove("ru-flag");
    flag.classList.add("en-flag");
  } else {
    flag.classList.remove("en-flag");
    flag.classList.add("ru-flag");
  }
}

export function translateAboutPage() {
  const aboutRU =
  `
  <h2 class="main__title">Добро пожаловать на викторину <em>Song</em><strong>Bird</strong></h2>
  <h3 class="main__subtitle">А хорошо ли вы знаете голоса птиц? Давайте проверим!</h3>
  <p class="main__text">Правила викторины:</p>
  <ul class="main__list">
    <li class="main__item">Начните игру</li>
    <li class="main__item">Прослушайте голос птицы</li>
    <li class="main__item">Выберите голос из предложенных ниже вариантов</li>
    <li class="main__item">Если ответ верный - получаете 5 баллов. Если нет, то с каждой последующей попыткой результат уменьшается на 1 балл</li>
    <li class="main__item">После нахождения верного ответа переходите к следующему вопросу</li>
    <li class="main__item">По окончанию викторины выводится итоговый результат</li>
  </ul>
  <p class="main__text">При каждом ответе, в том числе и не верном, вы можете увидеть изображение с птицей, прочитать информацию о ней, прослушать какие звуки она издает.</p>
  <a href="game.html">
    <div class="main__button">Начать викторину</div>
  </a>
  `;

  const aboutEN =
  `
  <h2 class="main__title">Welcome to quiz <em>Song</em><strong>Bird</strong></h2>
  <h3 class="main__subtitle">How well do you know the voices of birds? Let's check!</h3>
  <p class="main__text">Quiz rules:</p>
  <ul class="main__list">
    <li class="main__item">Start the game</li>
    <li class="main__item">Listen to the bird's voice</li>
    <li class="main__item">Choose a voice from the options below</li>
    <li class="main__item">If the answer is correct, you get 5 points. If not, then with each subsequent attempt, the result decreases by 1 point.</li>
    <li class="main__item">After finding the correct answer, move on to the next question.</li>
    <li class="main__item">At the end of the quiz, the final result is displayed</li>
  </ul>
  <p class="main__text">With each answer, including the wrong one, you can see an image with a bird, read information about it, listen to what sounds it makes.</p>
  <a href="game.html">
    <div class="main__button">Start a quiz</div>
  </a>
  `;

  const mainWrapper = document.querySelector(".main__wrapper");
  mainWrapper.innerHTML = '';

  if (lang == "en") {
    mainWrapper.innerHTML += aboutEN;
  } else {
    mainWrapper.innerHTML += aboutRU;
  }
}
