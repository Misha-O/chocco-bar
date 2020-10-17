$(".team__title").on("click", function (e) {
  e.preventDefault();
  $this = $(e.currentTarget);

  const container = $this.closest(".team__list");

  const elemContainer = $this.closest(".team__item");

  if ($(elemContainer).hasClass("active")) {
    closeAllItems(container);
  } else {
    closeAllItems(container);

    openItem($this);
  }

  function openItem(someItem) {
    const container = someItem.closest(".team__item");
    const contentBlock = container.find(".team__content");
    const textBlock = contentBlock.find(".team__block");
    const reqHeight = textBlock.height();
    container.addClass("active");

    contentBlock.height(reqHeight);
  }

  function closeAllItems(container) {
    const items = container.find(".team__content");

    const itemContainer = container.find(".team__item");

    itemContainer.removeClass("active");
    items.height(0);
  }
});

// !logic
// todo 1. process event and assign to this
// todo 2. call open function, with argument "this" which will be open
// todo 3. express function with argument on prev click event(team__title). So we click team__title -> send it to open function -> then find block which we need to open/calc height
// todo 4. inside function find wrapper in relation to function parameter (item), then from last point find team__content -> team__block
// todo 5. get height of that block and apply to content
// todo 6. to close: function to closeALL with container as parameter
// todo 7. find content blocks -> run height with 0 method
// todo 8. you need vrb to find relative way to store whole element where it will search for further items inside
// todo 9. run close before open
// todo 10. to see what is open add class on item(in open func)//if yes -> close and remove class // if no open and add class
