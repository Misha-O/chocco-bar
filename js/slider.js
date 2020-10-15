let arrowRight = document.querySelectorAll(".slider__image--svg--right");
let arrowLeft = document.querySelectorAll(".slider__image--svg--left");
let slideWidth = document.querySelector(".slider__item");
let sliderRoot = document.getElementById("sliderRoot");
let sliderList = document.querySelector(".slider__list");

let sliderPosition = 0;

arrowRight.forEach((arrow) => {
  arrow.addEventListener("click", () => moveRight());
});
arrowLeft.forEach((arrow) => {
  arrow.addEventListener("click", () => moveLeft());
});

// if we at last slide -> it resets to original
function moveRight() {
  sliderPosition += slideWidth.clientWidth;
  if (sliderPosition === sliderList.scrollWidth) {
    sliderPosition = 0;
  }
  sliderRoot.style.transform = `translate(-${sliderPosition}px)`;
}

function moveLeft() {
  if (sliderPosition === 0) {
    sliderPosition = sliderList.scrollWidth - slideWidth.clientWidth;
  } else {
    sliderPosition -= slideWidth.clientWidth;
  }

  sliderRoot.style.transform = `translate(-${sliderPosition}px)`;
}

sliderList.addEventListener("swiped-right", () => moveLeft());
sliderList.addEventListener("swiped-left", () => moveRight());
