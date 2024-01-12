var username = document.getElementById("username");
var pass = document.getElementById("password");

var listUsers = JSON.parse(localStorage.getItem("users")) || [];

function loginSM(e) {
  e.preventDefault();
  if (username.value.trim().length == 0 || pass.value.trim().length == 0) {
    alert("Vui long dien vo cho trong");
  } else {
    let checkUser = false;
    for (let i in listUsers) {
      if (
        listUsers[i].username.trim() == username.value.trim() &&
        listUsers[i].pw.trim() == pass.value.trim()
      ) {
        checkUser = true;

        break;
      }
    }
    if (checkUser) {
      window.location.href = "../SP%20CK/home.html";
      alert("Success");
      localStorage.setItem(
        "CurrentUsers",
        JSON.stringify({
          CurrentUser: username.value.trim(),
        })
      );
    } else {
      alert("Ban sai tai khoan hoac mat khau");
    }
  }
}

document.getElementById("btn-submit").addEventListener("click", function (e) {
  loginSM(e);
});

let passwordInput = document.getElementById("password");
let btnPassword = document.getElementById("togglePassword");

btnPassword.addEventListener("click", function () {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }

  if (passwordInput.type === "password") {
    btnPassword.classList.remove("fa-eye-slash");
    btnPassword.classList.add("fa-eye");
  } else {
    btnPassword.classList.remove("fa-eye");
    btnPassword.classList.add("fa-eye-slash");
  }
});
