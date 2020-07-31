const baseUrl = "http://localhost:3000"
const adUrl = `${baseUrl}/ads`
const postUrl = `${baseUrl}/posts`
const companyUrl = `${baseUrl}/companies`
const customerUrl = `${baseUrl}/customers`
const productsUrl = `${baseUrl}/products`
const postsUrl = `${baseUrl}/posts`
let ads = [];
let companies = []
let customerPosts = []
let customers = []
document.addEventListener("DOMContentLoaded", () => {
    
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


function getAd(adlist) {
    adlist.forEach(ad => {
        adCard(ad)
    })
}

function adCard(ad) {
    let container = document.getElementById("ad-container")
    let div1 = document.createElement("div")
    div1.classList.add("ad-card")
    div1.id = `company-container-${ad.company_id}`
    div1.innerText = ad.company.name

    let ul = document.createElement("ul")
    ul.classList.add("product-container")
    container.appendChild(div1)
    div1.appendChild(ul)
    let productsArr = ad.company.products 
    productsArr.forEach(product => {      // for displaying multiple products
        productCard(product)
    })
    // var rand = productsArr[(Math.random() * productsArr.length) | 0] // for displaying 1 random products
    // productCard(rand)
    
    
    document.getElementById(`company-container-${ad.company_id}`).onclick=e => {
        clearAllDivs()
        showCompanyProfile(ad.company)
    }
    
    
}

function productCard(product) {
    
    let div = document.getElementById(`company-container-${product.company_id}`)
    let ul = div.querySelector("ul")
    let li = document.createElement("li")
    li.className = "product"
    li.innerHTML = `
        <div class="product-card">
        <h3 class="product-name">${product.name}</h3>
        <img src=${product.image} class="product-img">
        <br>
        <h3 class="price">$${product.price}</h3>

        </div>
    `
    ul.appendChild(li)


}

function adCardLogin(ad) {
    let container = document.getElementById("ad-container")
    let div1 = document.createElement("div")
    div1.classList.add("ad-card")
    div1.id = `company-container-${ad.company_id}`
    div1.innerText = ad.company.name
    container.appendChild(div1)
}