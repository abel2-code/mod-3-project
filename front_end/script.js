let signedIn = false
document.addEventListener("DOMContentLoaded", () => {
  showNavBar()
})

function showNavBar() {
    console.log("i'm working here")
    let navBar = document.getElementById('fixed-nav-bar')
        if (signedIn) {
            navBar.innerHTML = `<ul class="nav-bar">
                <li class="nav-bar"><a id='logout'>Log Out</a></li>
                <li class="nav-bar"><a id='home'>Home</a></li>
                <li class="nav-bar" style="float:left"><a id='business-ads'>Business Ads: the products you want, at the prices we want</a></li>
                </ul>
            `
            addSignedInListeners()
        } else {
            navBar.innerHTML = `<ul class="nav-bar">
                <li class="nav-bar"><a id='signup'>Sign Up</a></li>
                <li class="nav-bar"><a id='signin'>Sign In</a></li>
                <li class="nav-bar"><a id='about'>About</a></li>
                <li class="nav-bar" style="float:left"><a id='business-ads'>Business Ads: the products you want, at the prices we want</a></li>
                </ul>
            `
            addSignedOutListeners()
        }
}

function addSignedInListeners() {
    console.log('we did thing, baws')
    changeNavBarActive()
    document.getElementById('home').className = "active"
    addLogoutListener()
}

let form = document.getElementById('form')

function addLogoutListener() {
    console.log('doin great, baws')

    addSignedInBusinessAdsListener()
    const logout = document.getElementById('logout')
    logout.addEventListener('click', e => {
        signedIn = false;
        showNavBar()
        clearAllDivs()
    })
}

function addSignedOutListeners() {
  
    // form.style.display="none"
    console.log('still working')
    addSigninListener()
    addSignupListener()
    addBusinessAdsListener()
}

function addSignedInBusinessAdsListener(){
  const businessAds = document.getElementById('business-ads')
  businessAds.addEventListener('click', e => {
    clearAllDivs()
    changeNavBarActive()

    ads.forEach(ad => {
      adCardLogin(ad)
    })
  })
}

function addBusinessAdsListener() {
  const businessAds = document.getElementById('business-ads')
  businessAds.addEventListener('click', e => {
    clearAllDivs()
    changeNavBarActive()

    const adPromise = fetch(adUrl).then(res => res.json())
    const productPromise = fetch(productsUrl).then(res => res.json())
    const companyPromise = fetch(companyUrl).then(res => res.json())
    const postPromise = fetch(postsUrl).then(res => res.json())
    const customerPromise = fetch(customerUrl).then(res => res.json())
    Promise.all([adPromise, productPromise, companyPromise, postPromise, customerPromise]).then((res) => {
        // const [ads, products, companies] = res;
        ads = res[0].map((ad) => {
            ad.company = "" 
            return ad
            
        })
        companies = res[2].map((company) => {
            company.products = []
            company.posts = []
            return company
        })
        
        companies.forEach((co) => {
            const ad = ads.find(ad => ad.company_id === co.id)
            ad.company = co

            return co
        });
        
        res[1].forEach((product) => {
            const company = companies.find(company => product.company_id === company.id)
            company.products.push(product)
        })

        customerPosts = res[3].map((post) => {
            post.customer = ""
            return post
        })

        customers = res[4].map((customer) => {
            return customer
        })
       

        customerPosts.forEach((p) => {
            const company = companies.find(company => p.company_id === company.id)
            const customer = customers.find(customer => p.customer_id === customer.id)
            p.customer = customer
            company.posts.push(p)
            
        })
        console.log(ads)
        getAd(ads)
        
    })
 
  })
}
let username
function addSigninListener() {
  const signin = document.getElementById('signin')
    signin.addEventListener('click', e => {
      clearAllDivs()
      changeNavBarActive()
      signin.className = "active"
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
          <input id="signin-button" class="submit-btn" type="submit" name="" value="Sign in">
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
    signup.addEventListener('click', e => {
        // form.style.display="block";
        clearAllDivs()
        changeNavBarActive()

        signup.className = "active"
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
              <input id="email" type="email" placeholder="E-mail" required>
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
              <select id="customer-or-company" class="form-control" name="customer-or-company" placeholder="I am a ...">
                <option value="customer">Customer</option>
                <option value="company">Company</option>
              </select>
            </div>
                <button id='submit-to-log-in' type="submit" class="submit-btn">Submit</button>
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
        const email = document.getElementById('email')
        const customerOrCompany = document.getElementById('customer-or-company')
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
          const user = {
            name: name.value,
            username: newUsername.value,
            email: email.value,
            password: password.value,
            address: "123 fake street"
          }
          if (customerOrCompany.value == "customer") {
            fetch(customerUrl, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
              },
              body: JSON.stringify(user)
            }).then(res => res.json()).then(json => greetNewCustomer(json))
          } else {
            fetch(companyUrl, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
              },
              body: JSON.stringify(user)
            }).then(res => res.json()).then(json => greetNewCompany(json))
          }
          submitForm()
        }

    })
}
let existingPassword
function submitForm() {
  clearAllDivs()

  signedIn = true
  showNavBar(signedIn)
}

function greetNewCustomer(customer) {
  clearAllDivs()
  const welcome = document.getElementById('welcome')
  welcome.innerHTML = `
  <div class="center">
    <div class="text-animation">
      Welcome, ${customer.username}. 
      Looking for products? 
      Let's get started!
    </div>
    <button id="explore-btn" class="explore-btn">Explore</button>
  </div>
  `
  fadeText()
  document.getElementById('explore-btn').onclick=e => {
    clearAllDivs()
    ads.forEach(ad => {adCardLogin(ad)})
  }
}

function greetNewCompany(company) {
  clearAllDivs()
  const welcome = document.getElementById('welcome')
  welcome.innerHTML = `
    <div class="animated-text">
      <div class="line">Welcome, ${company.name}</div>
      <div class="line">Looking to advertise?</div>
      <div class="line">Let's get started!</div>
    </div>
  `
  fadeText()
}

function fadeText() {
  const wrapper = document.getElementsByClassName("text-animation")[0];
  wrapper.style.opacity="1";
  wrapper.innerHTML = wrapper.textContent.replace(/./g,"<span>$&</span>");
  const spans = wrapper.getElementsByTagName("span");

  for(let i=0;i<spans.length;i++){
    spans[i].style.animationDelay = i*80+"ms";
  }
}

function clearAllDivs () {
    document.getElementById('error').innerHTML = ''
    document.getElementById('form').innerHTML = ''
    document.getElementById('welcome').innerHTML = ''
    document.getElementById('company-profile').innerHTML = ''
    document.getElementById('ad-container').innerHTML = ''
}

function changeNavBarActive() {
  if (signedIn) {
    document.getElementById('logout').className = ''
    document.getElementById('home').className = ''
    document.getElementById('business-ads').className = ''
  } else {
    document.getElementById('signup').className = ''
    document.getElementById('signin').className = ''
    document.getElementById('about').className = ''
    document.getElementById('business-ads').className = ''
  }
}

function showCompanyProfile(company){
  clearAllDivs()
  changeNavBarActive()
  const companyProfile = document.getElementById('company-profile')
  companyProfile.innerHTML = `
    <div class="container-fluid">
      <div class="company-box">
        <div class="row">
          <div class="logo">
            <img id="header-img" src=${company.logo}>
          </div>
          <div>
            <h1>${company.name}</h1>
          </div>
          <div>
            <h3>${company.slogan}</h3>
          </div>
        </div>
        <div class="row">
          <div class="left">
            <h2>See what our clients have to say:</h2>
          </div>
          <div class="right">
            <h4>Try out our fantastic products:</h4>
          </div>
        </div>
        <div class="row">
          <div class="left">
            <ul id="company-posts" class="company-posts"><button type="btn">Add comment</button></ul>
          </div>
          <div class="right">
            <div class="ad-card"
              <ul id="a" class="a"><ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  `

  renderCompanyPosts(company)
  renderCompanyProducts(company)
  
}

function renderCompanyPosts(company) {
  const companyPosts = document.getElementById('company-posts')
  company.posts.forEach(post => {
    const li = document.createElement('li')
    li.className = "customer-post"
    li.innerHTML = `
    "${post.content}" -${post.customer.username}
    `
  companyPosts.appendChild(li)
  })

}


function renderCompanyProducts(company) {
  const companyProducts = document.querySelectorAll("ul")[2]
  company.products.forEach(product => {
    const li = document.createElement('li')
    li.className = 'product'
    li.innerHTML = `
      <div class="product-card">
      <h3 class="product-name">${product.name}</h3>
      <img src=${product.image} class="product-img">
      <br>
      <h3 class="price">$${product.price}</h3>

      </div>
    `
  companyProducts.appendChild(li)
  })
}