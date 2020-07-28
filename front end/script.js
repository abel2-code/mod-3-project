let signedIn = false

showNavBar()



function showNavBar() {
    console.log("i'm working here")
    let navBar = document.getElementById('fixed-nav-bar')
        if (signedIn) {
            navBar.innerHTML = `<ul>
                <li><a id='logout'>Log Out</a></li>
                <li><a id='home'>Home</a></li>
                </ul>
            `
            addSignedInListeners()
        } else {
            navBar.innerHTML = `<ul>
                <li><a id='signup'>Sign Up</a></li>
                <li><a id='signin'>Sign In</a></li>
                <li><a id='about'>About</a></li>
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
function addSigninListener() {
    const signin = document.getElementById('signin')
    signin.addEventListener('click', e => {
        form.innerHTML = ''
        form.innerHTML = `
        <div class="form-group row">
            <label for='username' class="col-sm-2 col-form-label">Username</label>
            <div class="col-sm-10">
                <input id="existing-username" name="username" type="text">
            </div>
        </div>
        <div class="form-group row">
            <label for='password' class="col-sm-2 col-form-label">Password</label>
            <div class="col-sm-10">
                <input id="existing-password" name="password" type="password">
            </div>
        </div>
        <div class="form-group row">
            <div class="col-sm-10">
                <button id='submit-to-sign-in' type="submit" class="btn btn-primary">Submit</button>
            </div>
        </div>
        `
        submitForm()
    })
}

function addSignupListener() {
    const signup = document.getElementById('signup')
    signup.addEventListener('click', e => {
        // form.style.display="block";
        form.innerHTML = ''
        form.innerHTML = `
            <div class="form-group row">    
                <label for='name' class="col-sm-2 col-form-label">Name</label>
                <div class="col-sm-10">
                    <input id="name" name="name" type="text" required>
                </div>
            </div>
            <div class="form-group row">
                <label for='username' class="col-sm-2 col-form-label">Username</label>
                <div class="col-sm-10">
                    <input id="username" name="username" type="text" required>
                </div>
            </div>    
            <div class="form-group row">
                <label for='email' class="col-sm-2 col-form-label">Email</label>
                <div class="col-sm-10">
                    <input id="inputEmail3" name="email" type="email" required>
                </div>
            </div>
            <div class="form-group row">
                <label for='password' class="col-sm-2 col-form-label">Create Password</label>
                <div class="col-sm-10">
                    <input id="password" name="password" type="password" required>
            
                    <meter max="4" id="password-strength-meter"></meter>
                    <p id="password-strength-text"></p>
                </div>
            </div>
            <div class="form-group row">
                <label for='name' class="col-sm-2 col-form-label">Confirm Password</label>
                <div class="col-sm-10">
                    <input id="confirm-password" name="confirm-password" type="password" onChange="checkPasswordMatch();" required>
                </div>
            </div>
            <div class="form-group row">
                <div class="col-sm-2 col-form-label" id="divCheckPasswordMatch"></div>
            </div>
            <div class="form-group row">
                <label for="customer-or-company" class="col-sm-2 col-form-label">I am a . . . </label>
                <div class="col-sm-10">
                    <select id="customer-or-company" class="form-control" name="customer-or-country">
                        <option value="customer">Customer</option>
                        <option value="company">Company</option>
                    </select>
                </div>
            </div>
            <div class="form-group row">
                <div class="col-sm-10">
                    <button id='submit-to-log-in' type="submit" class="btn btn-primary">Submit</button>
                </div>
            </div>
        `
        submitForm()

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

        const name = document.getElementById('name')
        const confirmPassword = document.getElementById('confirm-password')
        const errorElement = document.getElementById('error')
        form.addEventListener('submit', e => {
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

            if (messages.length > 0 
                // && existingPassword == null
                ) {
                e.preventDefault()
                errorElement.innerText = messages.join(', ')
            } 
        })

    })
}

function submitForm() {
    let username
    let existingPassword

    document.getElementById("form").onsubmit=function(e) {
        e.preventDefault()

        const existingUsername = document.getElementById('existing-username')
        const newUsername = document.getElementById('username')

        if (existingUsername != null) {
            username = existingUsername.value
            existingPassword = document.getElementById('existing-password').value
        }
        if (newUsername != null) {
            username = newUsername.value
        }

        form.innerHTML = `Welcome ${username}`

        signedIn = true
        showNavBar()
    }
}

// $("#theForm").ajaxForm({url: 'file:///C:/Users/18326/Desktop/mod-3-project/module-3-backend/front%20end/index.html', type: 'post'})

