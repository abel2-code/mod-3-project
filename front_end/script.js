let signedIn = false
document.addEventListener("DOMContentLoaded", () => {
  showNavBar(signedIn)
})

function showNavBar() {
    console.log("i'm working here")
    let navBar = document.getElementById('fixed-nav-bar')
        if (signedIn) {
            navBar.innerHTML = `<ul class="nav-bar">
                <li class="nav-bar"><a id='logout'>Log Out</a></li>
                <li class="nav-bar"><a id='home'>Home</a></li>
                <li style="float:left">Business Ads: the products you want, at the price we want</li>
                </ul>
            `
            addSignedInListeners()
        } else {
            navBar.innerHTML = `<ul class="nav-bar">
                <li class="nav-bar"><a id='signup'>Sign Up</a></li>
                <li class="nav-bar"><a id='signin'>Sign In</a></li>
                <li class="nav-bar"><a id='about'>About</a></li>
                <li class="nav-bar" style="float:left"><a>Business Ads: the products you want, at the price we want</a></li>
                </ul>
            `
            addSignedOutListeners()
        }
}

function addSignedInListeners() {
    console.log('we did thing, baws')
    addLogoutListener()
}

let form = document.getElementById('form')

function addLogoutListener() {
    console.log('doin great, baws')

    const logout = document.getElementById('logout')
    logout.addEventListener('click', e => {
        signedIn = false;
        showNavBar()
        form.innerHTML = `You've logged out`
    })
}

function addSignedOutListeners() {
  
    // form.style.display="none"
    console.log('still working')
    addSigninListener()
    addSignupListener()

}
let username
function addSigninListener() {
    const signin = document.getElementById('signin')
    const signup = document.getElementById('signup')
    const ad = document.getElementById('ad-container')
    signin.addEventListener('click', e => {
      ad.innerHTML = ""
      signup.className = ""
      signin.className = "active"
        form.innerHTML = ''
        form.innerHTML = `
        <div class="login-box">
          <h1>Log In</h1>
          <div class="textbox">
            <i class="fa fa-user" aria-hidden="true"></i>
            <input id="existing-username" type="text" placeholder="Username" required>
          </div>
          <div class="textbox">
            <i class="fa fa-lock" aria-hidden="true"></i>
            <input id="existing-password" type="password" placeholder="Password" name="password" required>
          </div>
          <input id="signin-button" class="btn btn-primary" type="submit" name="" value="Sign in">
        </div>
        `

        const existingUsername = document.getElementById("existing-username")
        form.onsubmit=e => {
          e.preventDefault()
          username = existingUsername.value
          console.log(username)
          submitForm(username)
        }
        
    })
}

function addSignupListener() {
    const signup = document.getElementById('signup')
    const signin = document.getElementById('signin')
    const ad = document.getElementById('ad-container')
    signup.addEventListener('click', e => {
        // form.style.display="block";
        ad.innerHTML = ""
        signin.className = ""
        signup.className = "active"
        form.innerHTML = ''
        form.innerHTML = `
          <div class="login-box"> 
            <h1>Sign Up</h1>  
            <div class="textbox">
              <i class="fa fa-user-circle" aria-hidden="true"></i>
              <input id="name" type="text" placeholder="Name" required>
            </div>
            <div class="textbox">
              <i class="fa fa-user" aria-hidden="true"></i>
              <input id="username" type="text" placeholder="Username" required>
            </div>   
            <div class="textbox">
              <i class="fa fa-envelope" aria-hidden="true"></i>
              <input id="inputEmail3" type="email" placeholder="E-mail" required>
            </div>
            <div class="textbox">
              <i id="lock1" class="fa fa-unlock-alt" aria-hidden="true"></i>
              <input id="password" name="password" type="password" placeholder="Password" required>
                  <meter max="4" id="password-strength-meter"></meter>
                  <p class="password-feedback" id="password-strength-text"></p>
            </div>
            <div class="textbox">
              <i id="lock2" class="fa fa-unlock-alt" aria-hidden="true"></i>
                <input id="confirm-password" name="confirm-password" type="password" placeholder="Confirm Password" onChange="checkPasswordMatch();" required>
            </div>
            <div class="password-feedback" id="divCheckPasswordMatch"></div>
            <div class="textbox">
              <select id="customer-or-company" class="form-control" name="customer-or-country" placeholder="I am a ...">
                <option value="customer">Customer</option>
                <option value="company">Company</option>
              </select>
            </div>
                <button id='submit-to-log-in' type="submit" class="btn btn-primary">Submit</button>
          </div>
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
            text.innerHTML = `Strength: <strong>${strength[result.score]}</strong>
            <span class='feedback'> ${result.feedback.warning} ${result.feedback.suggestions}</span>`; 
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
            $("#divCheckPasswordMatch").html("Passwords do not match!"),
            $("#lock1").attr("class", "fa fa-unlock-alt"),
            $("#lock2").attr("class", "fa fa-unlock-alt");
          else
            $("#divCheckPasswordMatch").html("Passwords match."),
            $("#lock1").attr("class", "fa fa-lock"),
            $("#lock2").attr("class", "fa fa-lock");
        }

        $(document).ready(function () {
            $("#password, #confirm-password").keyup(checkPasswordMatch);
        })

        const name = document.getElementById('name')
        const newUsername = document.getElementById('username')
        const confirmPassword = document.getElementById('confirm-password')
        const errorElement = document.getElementById('error')
        form.onsubmit=e => {
          e.preventDefault()
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

          if (messages.length > 0 && existingPassword == null) {
              e.preventDefault()
              errorElement.innerText = messages.join(', ')
          } 
          console.log(newUsername.value)
          username = newUsername.value
          submitForm(username)
        }

    })
}
let existingPassword
function submitForm(username) {
  console.log(username)
  form.innerHTML = `Welcome ${username}`

  signedIn = true
  showNavBar(signedIn)
}
