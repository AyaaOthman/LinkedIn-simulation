const registrationEmailInput = document.getElementById("registrationEmail");
const registrationPasswordInput = document.getElementById(
  "registrationPassword"
);
const emailValidationMsg = document.getElementById("emailValidationMsg");
const passwordValidationMsg = document.getElementById("passwordValidationMsg");
const showPasswordBtn = document.getElementById("showPasswordBtn");
const registerBtn = document.getElementById("registerBtn");
// Inputs Validation//

// REGEX
const emailRegExr = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const passRegExr = /[\w-\.]{6,}/;
//email validation function
function notValidEmailStyle() {
  registrationEmailInput.classList.remove("border-gray-400");
  registrationEmailInput.classList.add("border-red-400");
  emailValidationMsg.classList.remove("hidden");
}
function validEmailStyle() {
  registrationEmailInput.classList.add("border-gray-400");
  registrationEmailInput.classList.remove("border-red-400");
  emailValidationMsg.classList.add("hidden");
}
registrationEmailInput.addEventListener("focusout", () => {
  const isEmailValid = emailRegExr.test(registrationEmailInput.value);
  if (!isEmailValid) {
    notValidEmailStyle();
  } else {
    validEmailStyle();
  }
});

registrationEmailInput.addEventListener("keydown", () => {
  emailValidationMsg.classList.add("hidden");
  document.getElementById("existing-email-alert").classList.add("hidden");
});

//password validation function
function notValidPasswordStyle() {
  registrationPasswordInput.classList.remove("border-gray-400");
  registrationPasswordInput.classList.add("border-red-400");
  passwordValidationMsg.classList.remove("hidden");
}
function validPasswordStyle() {
  registrationPasswordInput.classList.add("border-gray-400");
  registrationPasswordInput.classList.remove("border-red-400");
  passwordValidationMsg.classList.add("hidden");
}
registrationPasswordInput.addEventListener("focusout", () => {
  const isPasswordValid = passRegExr.test(registrationPasswordInput.value);
  if (!isPasswordValid) {
    notValidPasswordStyle();
  } else {
    validPasswordStyle();
  }
});

registrationPasswordInput.addEventListener("keydown", () => {
  passwordValidationMsg.classList.add("hidden");
});

//show password
showPasswordBtn.addEventListener("click", () => {
  let inputType = registrationPasswordInput.getAttribute("type");
  console.log(inputType);
  if (inputType == "password") {
    registrationPasswordInput.setAttribute("type", "text");
    showPasswordBtn.textContent = "Hide";
  } else {
    registrationPasswordInput.setAttribute("type", "password");
    showPasswordBtn.textContent = "Show";
  }
});
const registrationFirstNameInput = document.getElementById(
  "registrationFirstName"
);
const registrationLastNameInput = document.getElementById(
  "registrationLastName"
);
const firstNameValidationMsg = document.getElementById(
  "firstNameValidationMsg"
);
const lastNameValidationMsg = document.getElementById("lastNameValidationMsg");
const registrationCountryInput = document.getElementById("registrationCountry");
const registrationCityInput = document.getElementById("registrationCity");

const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;

function notValidFirstNameStyle() {
  registrationFirstNameInput.classList.remove("border-gray-400");
  registrationFirstNameInput.classList.add("border-red-400");
  firstNameValidationMsg.classList.remove("hidden");
}
function notValidLastNameStyle() {
  registrationLastNameInput.classList.remove("border-gray-400");
  registrationLastNameInput.classList.add("border-red-400");
  lastNameValidationMsg.classList.remove("hidden");
}
registrationFirstNameInput.addEventListener("focusout", () => {
  if (!nameRegex.test(registrationFirstNameInput.value)) {
    notValidFirstNameStyle();
  } else {
    registrationFirstNameInput.classList.remove("border-red-400");
    firstNameValidationMsg.classList.add("hidden");
  }
});
registrationLastNameInput.addEventListener("focusout", () => {
  if (!nameRegex.test(registrationLastNameInput.value)) {
    notValidLastNameStyle();
  } else {
    registrationLastNameInput.classList.remove("border-red-400");
    lastNameValidationMsg.classList.add("hidden");
  }
});

registerBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (!emailRegExr.test(registrationEmailInput.value)) {
    notValidEmailStyle();
  } else if (!passRegExr.test(registrationPasswordInput.value)) {
    notValidPasswordStyle();
  } else if (!nameRegex.test(registrationLastNameInput.value)) {
    notValidLastNameStyle();
  } else if (!nameRegex.test(registrationFirstNameInput.value)) {
    notValidFirstNameStyle();
  } else if (localStorage.getItem(`${registrationEmailInput.value}`)) {
    document.getElementById("existing-email-alert").classList.remove("hidden");
  } else if (
    emailRegExr.test(registrationEmailInput.value) &&
    passRegExr.test(registrationPasswordInput.value)
  ) {
    console.log(localStorage.getItem(`${registrationEmailInput.value}`));
    const userObj = {
      id: generateRandom(),
      email: registrationEmailInput.value,
      password: registrationPasswordInput.value,
      firstName: registrationFirstNameInput.value,
      lastName: registrationLastNameInput.value,
      country: registrationCountryInput.value,
      city: registrationCityInput.value,
    };
    localStorage.setItem(
      `${registrationEmailInput.value}`,
      JSON.stringify({ userObj })
    );

    open("../index/sign-in.html", "_self");
  }
});
//getting random user ID
function generateRandom(min = 100, max = 1000) {
  let difference = max - min;
  let rand = Math.random();
  rand = Math.floor(rand * difference);
  rand = rand + min;

  return rand;
}
