const loginSection = document.getElementById("login-section");
const usernameInput = document.getElementById("username-input");
const passwordInput = document.getElementById("password-input");
const loginBtn = document.getElementById("login-btn");
const mainApp = document.getElementById("main-app");

loginBtn.addEventListener("click", function (event) {
  const typedUsername = usernameInput.value;
  const typedPassword = passwordInput.value;

  if (typedUsername === "admin" && typedPassword === "admin123") {
    loginSection.classList.add("hidden");
    mainApp.classList.remove("hidden");
  }
});
