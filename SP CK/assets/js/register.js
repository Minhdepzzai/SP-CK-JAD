let register_submit = document.getElementById("btn-submit");
register_submit.addEventListener("click", (e) => {
  e.preventDefault();
  let email = document.getElementById("email");
  let username = document.getElementById("username");
  let password = document.getElementById("password");
  let passCF = document.getElementById("password-confirm");
  let regex_email =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  let regex_password = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8})$/;

  if (
    email.value.trim().length == 0 ||
    username.value.trim().length == 0 ||
    password.value.trim().length == 0 ||
    passCF.value.trim().length == 0
  ) {
    alert("Please blank all the empty");
  } else if (username.value.trim().length > 12) {
    alert("Username must be 13 characters");
  } else if (!email.value.trim().match(regex_email)) {
    alert("Write again the email");
  } else if (!password.value.trim().match(regex_password)) {
    alert("Write again the ps");
  } else if (password.value.trim() != passCF.value.trim()) {
    alert("Two password don't like");
  } else {
    if (localStorage.users) {
      let users = JSON.parse(localStorage.users);
      users.push({
        email: email.value.trim(),
        username: username.value.trim(),
        pw: password.value.trim(),
      });
      localStorage.setItem("users", JSON.stringify(users));
    } else {
      localStorage.setItem(
        "users",
        JSON.stringify([
          {
            email: email.value.trim(),
            username: username.value.trim(),
            pw: password.value.trim(),
          },
        ])
      );
    }
    alert("Suc");
    window.location.href = "../SP%20CK/login.html";
  }
});

let passwordInput = document.getElementById("password");
let cfpsInput = document.getElementById("password-confirm");
let btnPassword = document.getElementById("togglePassword");
let btnPasswordConfirm = document.getElementById("togglePasswordCF");

function showPS(field, btnPS) {
  if (passwordInput.type === "password") {
    field.type = "text";
  } else {
    field.type = "password";
  }

  if (type === "password") {
    btnPS.classList.remove("fa-eye-slash");
    btnPS.classList.add("fa-eye");
  } else {
    btnPS.classList.remove("fa-eye");
    btnPS.classList.add("fa-eye-slash");
  }
}
btnPassword.addEventListener("click", function () {
  showPS(passwordInput, btnPassword);
});

btnPasswordConfirm.addEventListener("click", function () {
  showPS(cfpsInput, btnPasswordConfirm);
});

// let register = document.querySelector("#register")
// register.addEventListener("submit", (e) => {
//     e.preventDefault()
//     let email = document.getElementById('email')
//     let pw = document.getElementById("password")

//     let lowerCaseLetter = /[a-z]/g
//     let upperCaseLetter = /[A-Z]/g
//     let numbers = /[0-9]/g

//     if (email.value.trim().length == 0 && pw.value.trim().length == 0) {
//         alert("Please input your email & password")
//     }
//         else if (email.value.trim().length == 0) {
//         alert("Please input your email")
//     }
//         else if (pw.value.trim().length == 0) {
//         alert("Please input your password")
//     }
//         else if (pw.value.trim().length < 8) {
//         alert("Password must be at least 8 characters.")
//     }
//         else if (!pw.value.trim().match(lowerCaseLetter)) {
//             alert("Password must  contain a lowercase letter")
//     }
//         else if (!pw.value.trim().match(upperCaseLetter)) {
//         alert("Password must  contain a uppercase letter")
//     }
//         else if (!pw.value.trim().match(numbers)) {
//         alert("Password must  contain a number or special character")
//     }
//         else {
//             if(localStorage.users) {
//                 let users = JSON.parse(localStorage.users)
//                 users.push({
//                     email: email.value.trim(),
//                     pw: pw.value.trim()
//                 })
//                 localStorage.setItem("users", JSON.stringify(users))
//             } else {
//                 localStorage.setItem("users",
//                 JSON.stringify(
//                 [
//                     {
//                       email: email.value.trim(),
//                       pw: pw.value.trim()
//                     }
//                 ]));
//             }
//             location.replace("../login/login.html")
//     }

// })
