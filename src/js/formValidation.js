const myForm = document.querySelector(".form");
const submitBtn = document.getElementById("submitBtn");

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  // returns only if ALL fields correct
  if (validateForm(myForm)) {
    const data = {
      name: form.elements.name.value,
      phone: form.elements.phone.value,
      comments: form.elements.comment.value,
    };

    //   create asynchronic request
    const xhr = new XMLHttpRequest();
    // receive data from server in json format
    xhr.responseType = "json";

    // preparation for sending
    xhr.open("POST", "https://webdev-api.loftschool.com/sendmail");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.send(JSON.stringify(data));
    xhr.addEventListener("load", (e) => {
      if (xhr.response.status) {
        //   !change it when modal is ready
        console.log("All good");
      }
    });
  }
});

//assume form filled correctly, thus valid = true (required needed in html)
function validateForm(form) {
  let valid = true;

  if (!validateField(myForm.elements.name.value)) {
    return false;
  }
  if (!validateField(myForm.elements.phone.value)) {
    return false;
  }
  if (!validateField(myForm.elements.comment.value)) {
    return false;
  }
  return true;
}
// validationMessage is dynamic/always has a string
// checkValidity is a browser method (true)
// validationMsg always goes to div below input if mistake

function validateField(input) {
  // field.nextElementSibling.textContent = field.validationMessage;

  return input.checkValidity();
}
