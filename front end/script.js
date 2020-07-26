const name = document.getElementById('name')
const password = document.getElementById('password')
const form = document.getElementById('form')
const errorElement = document.getElementById('error')
const meter = document.getElementById('password-strength-meter');
const text = document.getElementById('password-strength-text');
const confirmpassword = document.getElementById('confirm-password')
const strength = {
    0: "Worst ☹",
	1: "Bad ☹",
	2: "Weak ☹",
	3: "Good ☺",
	4: "Strong ☻",
}

password.addEventListener('input', function() {
  let val = password.value;
  let result = zxcvbn(val);

  // Update the password strength meter
  meter.value = result.score;
 
  // Update the text indicator
  if (val !== "") {
    text.innerHTML = "Strength: " + "<strong>" + strength[result.score] + "</strong>"
        + "<span class='feedback'>" + result.feedback.warning + " " + result.feedback.suggestions + "</span>"; 
  } else {
    text.innerHTML = "";
  }
});

function checkPasswordMatch() {
    let password = $("#password").val();
    let confirmPassword = $("#confirm-password").val()

    if (password == "" || confirmPassword == "")
        $("#divCheckPasswordMatch").html("");
    else if (password != confirmPassword)
    $("#divCheckPasswordMatch").html("Passwords do not match!");
    else
        $("#divCheckPasswordMatch").html("Passwords match.");
}

$(document).ready(function () {
    $("#password, #confirm-password").keyup(checkPasswordMatch);
})

form.addEventListener('submit', e => {
    let messages = []
    if (name.value === '' || name.value == null) {
        messages.push('Name is required')
    }

    if (password.value.length <= 6) {
        messages.push('Password must be longer than 6 characters')
    }

    if (messages.length > 0) {
        e.preventDefault()
        errorElement.innerText = messages.join(', ')
    }
})