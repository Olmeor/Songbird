import '../../assets/styles/fonts.css'
import '../../assets/styles/normalize.css'
import '../../assets/styles/body.css'
import '../../assets/styles/header.css'
import '../../assets/styles/footer.css'
import './main.css'

import { burgerOpen, openBurger, closeBurger } from '../../assets/js/burger'
import { changeLang, translateAboutPage, setFlag, toggleFlag, translateHeader } from '../../assets/js/translate'

burgerOpen.onclick = openBurger;
document.onclick = closeBurger;

const initAbout = () => {
  translateHeader();
  translateAboutPage();
  setFlag();
  console.log("Score 270 / 270\nPlease clear local storage");
};

initAbout();

window.onload = function() {
  const flag = document.querySelector(".main__flag");
  flag.onclick = function() {
    changeLang();
    toggleFlag();
    translateHeader();
    translateAboutPage();
  };
}