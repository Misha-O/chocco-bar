const sections = $("section");
const display = $(".maincontent");
const sideMenu = $(".fixed--menu");
const sideMenuItem = sideMenu.find(".fixed--menu__item");

// https://hgoebl.github.io/mobile-detect.js/

// const mobileDetect = new MobileDetect(window.navigator.userAgent);
// const isMobile = mobileDetect.mobile();

let inScroll = false;

sections.first().addClass("active");

const countSectionPosition = (sectionNum) => {
  const position = sectionNum * -100;

  if (isNaN(position)) {
    console.log("wrong value in countSectionPosition function");
    return 0;
  }

  return position;
};

changeMenuThemeForSection = (sectionNum) => {
  const currentSection = sections.eq(sectionNum);
  const menuTheme = currentSection.attr("data-sidemenu-theme");
  const activeClass = "fixed--menu--dark";

  if (menuTheme === "black") {
    sideMenu.addClass(activeClass);
  } else {
    sideMenu.removeClass(activeClass);
  }
};

resetActiveClassForItem = (allItems, specificItem, activeClass) => {
  allItems
    .eq(specificItem)
    .addClass(activeClass)
    .siblings()
    .removeClass(activeClass);
};

const performTransition = (sectionNum) => {
  if (inScroll) return;

  const transitionOver = 1000;
  const mouseInertiaOver = 300;

  inScroll = true;
  const position = countSectionPosition(sectionNum);

  changeMenuThemeForSection(sectionNum);

  display.css({
    transform: `translateY(${position}%)`,
  });

  resetActiveClassForItem(sections, sectionNum, "active");

  setTimeout(() => {
    inScroll = false;

    resetActiveClassForItem(sideMenuItem, sectionNum, "active");
  }, transitionOver + mouseInertiaOver);
};

const viewportScroller = () => {
  const activeSection = sections.filter(".active");
  const prevSection = activeSection.prev();
  const nextSection = activeSection.next();

  return {
    next() {
      if (nextSection.length) {
        performTransition(nextSection.index());
      }
    },
    prev() {
      if (prevSection.length) {
        performTransition(prevSection.index());
      }
    },
  };
};

$(window).on("wheel", (e) => {
  const deltaY = e.originalEvent.deltaY;
  const scroller = viewportScroller();

  if (deltaY > 0) {
    //   scroll next
    scroller.next();
  }
  if (deltaY < 0) {
    //   scroll prev
    scroller.prev();
  }
});
$(window).on("keydown", (e) => {
  tagName = e.target.tagName.toLowerCase();

  const userTypingInInput = tagName === "input" || tagName === "textarea";
  const scroller = viewportScroller();

  if (userTypingInInput) return;
  switch (e.key) {
    case "ArrowDown":
      scroller.next();
      break;
    case "ArrowUp":
      scroller.prev();
      break;
  }
});

$(".wrapper").on("touchmove", (e) => e.preventDefault());

$("[data-scroll-to]").on("click", (e) => {
  const $this = $(e.currentTarget);
  const target = $this.attr("data-scroll-to");
  const reqSection = $(`[data-section-id = ${target}]`);

  performTransition(reqSection.index());
});

// https://github.com/mattbryson/TouchSwipe-Jquery-Plugin

// if (isMobile) {
//   $("body").swipe({
//     swipe: function (event, direction) {
//       const scroller = viewportScroller();
//       let scrollDirection = "";

//       if (direction === "up") scrollDirection = "next";
//       if (direction === "down") scrollDirection = "prev";

//       scroller[scrollDirection]();
//     },
//   });
// }
