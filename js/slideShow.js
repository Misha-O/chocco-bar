const findByAlias = (alias) => {
  return $(".reviews__item").filter((indx, item) => {
    return $(item).attr("data-linked-with") == alias;
  });
};

$(".interactive--avatar__link").on("click", function (e) {
  e.preventDefault();

  const interLink = $(e.currentTarget);

  const target = interLink.attr("data-open");
  const shownItem = findByAlias(target);

  const curItem = interLink.closest(".reviews__switcher--item");

  shownItem.addClass("active").siblings().removeClass("active");
  curItem.addClass("active").siblings().removeClass("active");
});

// ! logic
// todo 1. event by click -> assign target to vrb -> find closest item parent (vrb)
// todo 2. add class to that parent AND remove it from the rest
// todo 3. add data attr to HTML to further connect both elements to act simultaneously
// todo 4. get that attr from link (vrb)
// todo 5. create function to find matching by attr blocks (switcher item and link)
// todo use parameter(alias) =>{} and func declaration
// todo filter switcher__items using parameter(indx, item) with further function (and return it) to return item with same attr value as alias (parameter)

// todo 6. (vrb) push attr from the link before through alias function and assign to vrb
// todo 6. add class to vrb above AND remove it from the rest
