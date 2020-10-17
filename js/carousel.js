const slider = $(".slider__list").bxSlider({
  pager: false,
  controls: false,
});
$(".slider__image--svg--left").on("click", function () {
  slider.goToPrevSlide();
});
$(".slider__image--svg--right").on("click", function () {
  slider.goToNextSlide();
});

// * https://bxslider.com/options/
