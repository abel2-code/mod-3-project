const form = document.getElementById('form')
// form.style.display="none"

const signin = document.getElementById('signin')
signin.addEventListener('click', e => {
    form.innerHTML = `
    <div>
      <label for='username'>Username</label>
      <input id="existing-username" name="username" type="text">
    </div>
    <div>
      <label for='password'>Create Password</label>
      <input id="existing-password" name="password" type="password">
    </div>
    <button type="submit">Submit</button>
    `
})

const signup = document.getElementById('signup')
signup.addEventListener('click', e => {
    // form.style.display="block";
    form.innerHTML = `
    <div>
      <label for='name'>Name</label>
      <input id="name" name="name" type="text" required>
    </div>
    <div>
      <label for='username'>Username</label>
      <input id="username" name="username" type="text" required>
    </div>
    <div>
      <label for='email'>Email</label>
      <input id="email" name="email" type="email" required>
    </div>
    <div>
      <label for='password'>Create Password</label>
      <input id="password" name="password" type="password" required>
      <br>
      <meter max="4" id="password-strength-meter"></meter>
      <p id="password-strength-text"></p>
    </div>
    <div>
      <label for='name'>Confirm Password</label>
      <input id="confirm-password" name="confirm-password" type="password" onChange="checkPasswordMatch();" required>
    </div>
    <div class="registrationFormAlert" id="divCheckPasswordMatch">
    </div>
    <button type="submit">Submit</button>
    `

    const password = document.getElementById('password')
    const meter = document.getElementById('password-strength-meter');
    const text = document.getElementById('password-strength-text');
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

    const name = document.getElementById('name')
    const confirmPassword = document.getElementById('confirm-password')
    const errorElement = document.getElementById('error')
    form.addEventListener('submit', e => {
        let messages = []
        if (name.value === '' || name.value == null) {
            messages.push('Name is required')
        }

        if (password.value.length <= 6) {
            messages.push('Password must be longer than 6 characters')
        }

        if (password.value !== confirmPassword.value) {
            messages.push('Passwords must match')
        }

        if (messages.length > 0) {
            e.preventDefault()
            errorElement.innerText = messages.join(', ')
        }
    })

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
    

})

$("#theForm").ajaxForm({url: 'file:///C:/Users/18326/Desktop/mod-3-project/module-3-backend/front%20end/index.html', type: 'post'})