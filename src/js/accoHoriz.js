const openTabs = (tab) => {
  const container = tab.closest(".variety__item");
  const itemWrapper = container.find(".variety__item--wrap");
  const itemContent = itemWrapper.find(".variety__item--descr");
  const reqWidth = itemContent.width();

  container.addClass("active");
  itemWrapper.width(reqWidth);
};

const closeTabs = (containerBlock) => {
  const container = containerBlock.closest(".variety__item");
  const itemWrapper = container.find(".variety__item--wrap");

  container.removeClass("active");
  itemWrapper.width(0);
};

$(".variety__item--title").click(function (e) {
  e.preventDefault();
  $this = $(e.currentTarget);

  const container = $this.closest(".variety__list");
  const containerElem = $this.closest(".variety__item");
  // const elemWrapper = containerElem.find(".variety__item--wrap");

  if ($(containerElem).hasClass("active")) {
    closeTabs(containerElem);
  } else {
    closeTabs(containerElem);

    openTabs($this);
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
