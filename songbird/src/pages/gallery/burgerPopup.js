import { closePopup } from "./gallery";

export const burgerOpen = document.querySelector('.header__burger_open');

export function openBurger(e) {
	const bodyShadow = document.querySelector('.body__shadow');
  const nav = document.querySelector('.header__nav');
  const title = document.querySelector('.header__title-burger');
  const burgerClose = document.querySelector('.header__burger_close');

	e.stopPropagation();
	nav.classList.add('header__nav_open');
	title.classList.add('header__title-burger_active');
	bodyShadow.classList.add('_active');
	burgerClose.classList.add('header__burger_close_active');
  document.body.style = "overflow: hidden";
}

export function closeBurger(e) {
	const bodyShadow = document.querySelector('.body__shadow');
  const nav = document.querySelector('.header__nav');
  const design = document.querySelector('.header__designed');
  const title = document.querySelector('.header__title-burger');
  const burgerClose = document.querySelector('.header__burger_close');
	let element = e.target;
	let burgerCheck = element == nav;

  if (nav.classList.contains('header__nav_open') && !burgerCheck) {
		nav.classList.remove('header__nav_open');
		title.classList.remove('header__title-burger_active');
		bodyShadow.classList.remove('_active');
		burgerClose.classList.remove('header__burger_close_active');
    document.body.style = "overflow: none";
	}

	const popup = document.querySelector('.gallery__popup');
	const galleryPopupClose = document.querySelector('.gallery__popup_close');
  if ( popup && (e.target == galleryPopupClose ||
    e.target.classList.contains('body__shadow'))) {
      closePopup(e)
  }
}
