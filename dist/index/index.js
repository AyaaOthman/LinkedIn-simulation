/// show password
const showPasswordBtn = document.getElementById("showPasswordBtn");
const logInPasswordInput = document.getElementById("logInPassword");
const passwordValidationMsg = document.getElementById("emailValidationMsg");

showPasswordBtn.addEventListener("click", () => {
  let inputType = logInPasswordInput.getAttribute("type");
  if (inputType == "password") {
    logInPasswordInput.setAttribute("type", "text");
    showPasswordBtn.textContent = "Hide";
  } else {
    logInPasswordInput.setAttribute("type", "password");
    showPasswordBtn.textContent = "Show";
  }
});
// REGEX
const emailRegExr = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

// email validation
const logInEmailInput = document.getElementById("logInEmail");
const emailValidationMsg = document.getElementById("emailValidationMsg");
function notValidEmailStyle() {
  logInEmailInput.classList.remove("border-gray-400");
  logInEmailInput.classList.add("border-red-400");
  emailValidationMsg.classList.remove("hidden");
}
function validEmailStyle() {
  logInEmailInput.classList.add("border-gray-400");
  logInEmailInput.classList.remove("border-red-400");
  emailValidationMsg.classList.add("hidden");
}
logInEmailInput.addEventListener("focusout", () => {
  const isEmailValid = emailRegExr.test(logInEmailInput.value);
  if (!isEmailValid) {
    notValidEmailStyle();
  } else {
    validEmailStyle();
  }
});
logInEmailInput.addEventListener("keydown", () => {
  emailValidationMsg.classList.add("hidden");
});

//find user
const signInBtn = document.getElementById("signInBtn");
signInBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    !localStorage.getItem(`${logInEmailInput.value}`) ||
    logInEmailInput.value === "" ||
    logInPasswordInput.value == ""
  ) {
    emailValidationMsg.classList.remove("hidden");
    document.getElementById("passwordValidationMsg").classList.remove("hidden");
  } else localStorage.getItem(`${logInEmailInput.value}`);
  {
    const registeredUserObj = JSON.parse(
      localStorage.getItem(`${logInEmailInput.value}`)
    );
    if (
      registeredUserObj.email === logInEmailInput.value &&
      registeredUserObj.password === logInPasswordInput.value
    ) {
      window.location.href = `../feed/feed.html?email=${logInEmailInput.value}`;
    } else {
      document
        .getElementById("passwordValidationMsg")
        .classList.remove("hidden");
      emailValidationMsg.classList.remove("hidden");
    }
  }
});
