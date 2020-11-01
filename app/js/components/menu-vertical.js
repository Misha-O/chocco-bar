const revealHamMenu = (e) => {
  $this = $(e.currentTarget);
  const menuVert = $this.closest(".menu--vertical");
  const hamPlank = $this.find(".hamburger__plank");
  if (hamPlank.hasClass("changed") && menuVert.hasClass("changed")) {
    $(menuVert).removeClass("changed");
    $(hamPlank).removeClass("changed");
  } else {
    $(menuVert).addClass("changed");
    $(hamPlank).addClass("changed");
  }
};

$(".hamburger").on("click", (e) => {
  revealHamMenu(e);
});

// const fullScreenMenu = document.querySelector(".fullscreen__menu");

// const openSideNav = () => {
//   $(fullScreenMenu).css({ width: "100%" });
// };

// const closeSideNav = (e) => {
//   $(fullScreenMenu).css({ width: "0%" });
//   $this = $(e.currentTarget);
//   const menuContainer = fullScreenMenu.find(".menu--vertical");
//   console.log(menuContainer);
//   const menuList = menuContainer.find(".menu__list");
// };

// $(".hamburger").on("click", (e) => {
//   e.preventDefault();
//   $this = $(e.currentTarget);
//   openSideNav();
// });

// $(".fullscreen__menu--close").on("click", (e) => {
//   e.preventDefault();

//   closeSideNav();
// });
