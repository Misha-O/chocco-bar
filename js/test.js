const left = document.querySelector("#left");
const right = document.querySelector("#right");
const sliderItem = document.querySelector(".slider__item");
const computedStyles = window.getComputedStyle(sliderItem);
const sliderSlide = document.querySelectorAll(".slider__slide");

const minRight = 0;
const slideWidth = window.getComputedStyle(sliderSlide);
const step = parseInt(slideWidth);
const preShownSlide = 1100 / step;
const maxRight = (sliderSlide.length - preShownSlide) * step;
let currentPosition = 0;

sliderItem.style.right = currentPosition;

right.addEventListener("click", (e) => {
  debugger;
  e.preventDefault;

  if (sliderItem < maxRight) {
    currentPosition += step;
    sliderItem.style.right = `${currentPosition}px`;
  }
});

left.addEventListener("click", (e) => {
  e.preventDefault;

  if (sliderItem > minRight) {
    currentPosition -= step;
    sliderItem.style.right = `${currentPosition}px`;
  }
});
