const formValidation = (form, inputFieldsArray) => {
  inputFieldsArray.forEach((inputField) => {
    inputField.removeClass("input__error");
    if (inputField.val().trim() == "") {
      inputField.addClass("input__error");
    }
  });
  const inputError = form.find(".input__error");
  return inputError.length == 0;
};

$(".form").submit(function (e) {
  e.preventDefault();

  const form = $(e.currentTarget);
  const name = form.find("[name='name']");
  const phone = form.find("[name='phone']");
  const comment = form.find("[name='comment']");
  const to = form.find("[name='to']");
  const isValid = formValidation(form, [name, phone, comment, to]);
  const modal = $("#modal");
  const content = $(modal).find(".modal__content");

  modal.removeClass("error-modal");

  if (isValid) {
    const request = $.ajax({
      type: "POST",
      url: "https://webdev-api.loftschool.com/sendmail",
      data: {
        name: $(name).val(),
        phone: $(phone).val(),
        comment: $(comment).val(),
        to: $(to).val(),
      },
      error: (data) => {},
    });
    request.done((data) => {
      content.text(data.message);
    });
    request.fail((data) => {
      const message = data.responseJSON.message;
      content.text(message);
      modal.addClass("error-modal");
    });
    request.always((data) => {
      $.fancybox.open({
        src: "#modal",
        type: "inline",
      });
    });
  }
});

$(".js-submit-btn").click(function (e) {
  e.preventDefault();
  $.fancybox.close();
});

// * http://fancyapps.com/fancybox/3/docs/#api

// !logic
// todo 1.submit event on form with fancybox modal method
// todo 2.jQuery click event on btn -> close method fancybox
// todo 3.form request send -> jQuery ajax
// todo 4.pick up current target and assign to vrb
// todo 5.now from that pick up needed inputs (vrb)
// todo 6.create object in data ajax request and list needed value/keys
// todo 7.to prevent blank form from sending, create array with needed input values and use forEach
// todo 8.if input field empty add class error(styled already), if not remove(but do it before so we make sure it never has this class in the beginning)
// todo 9.after, to restrict sending form with any mistakes, find elems with class error (vrb) in the form, and if their quantity is 0, then send ajax request
// todo 10. to clean up, declare function validate with form and array(with needed input fields), created earlier as parameters, where you move 'error components'. Return it if mistakes == 0
// todo 11.then in submit event add vrb with that function(form, and array)
// todo 12.use that vrb to change prev if statement

// todo 13.use that vrb to change prev if statement
// todo 14.assign modal elem (vrb) // then from it find content
// todo 15. in ajax success mesg add data.message to show in content
