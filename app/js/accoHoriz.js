const measureWidth = (tab) => {
  const screenWidth = $(window).width();
  const container = tab.closest(".variety__list");
  const itemTitles = container.find(".variety__item--title");
  const tabsWidth = itemTitles.width() * itemTitles.length;

  const contentBlock = container.find(".variety__item--descr");
  const reqWidth = contentBlock.width();

  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  if (isMobile) {
    return tabsWidth;
  } else {
    return reqWidth;
  }

  return screenWidth - tabsWidth;
};

const openTabs = (tab) => {
  const hiddenContent = tab.find(".variety__item--wrap");
  const itemContent = hiddenContent.find(".variety__item--descr");
  const reqWidth = measureWidth(tab);

  tab.addClass("active");
  hiddenContent.width(reqWidth);
};

const closeTabs = (containerBlock) => {
  const containers = containerBlock.find(".variety__item");
  const itemWrapper = containers.find(".variety__item--wrap");

  containers.removeClass("active");
  itemWrapper.width(0);
};

$(".variety__item--title").click(function (e) {
  e.preventDefault();
  $this = $(e.currentTarget);

  const container = $this.closest(".variety__list");
  const containerElem = $this.closest(".variety__item");

  const containerElemOpened = containerElem.hasClass("active");

  if (containerElemOpened) {
    closeTabs(container);
  } else {
    closeTabs(container);
    openTabs(containerElem);
  }
});

// !logic
// todo 1. process event and assign current target to this
// todo 2. call open function, with argument "this"
// todo 3. express function with argument on prev click event(team__title). So we click team__title -> send it to open function -> then find block which we need to open/calc height
// todo 4. inside function find wrapper in relation to function parameter (item), then from last point find team__content -> team__block
// todo 5. get height of that block and apply to content
// todo 6. to close: function to closeALL with container as parameter
// todo 7. find content blocks -> run height with 0 method
// todo 8. you need vrb to find relative way to store whole element where it will search for further items inside
// todo 9. run close before open
// todo 10. to see what is open add class on item(in open func)//if yes -> close and remove class // if no, open and add class
