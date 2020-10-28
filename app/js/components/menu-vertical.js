const fullScreenMenu = document.querySelector(".fullscreen__menu");

const openSideNav = () => {
  $(fullScreenMenu).css({ width: "100%" });
};

const closeSideNav = () => {
  $(fullScreenMenu).css({ width: "0%" });
};

$(".hamburger").on("click", (e) => {
  e.preventDefault();
  openSideNav();
});

$(".fullscreen__menu--close", ".menu__link").on("click", (e) => {
  e.preventDefault();
  closeSideNav();
});
