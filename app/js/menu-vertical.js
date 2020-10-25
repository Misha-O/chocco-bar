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

$(".fullscreen__menu--close").on("click", (e) => {
  e.preventDefault();
  $this = $(e.currentTarget);
  closeSideNav();
});
