const baseUrl = "http://localhost:3000"
const adUrl = `${baseUrl}/ads`
const postUrl = `${baseUrl}/posts`
const companyUrl = `${baseUrl}/companies`
const customerUrl = `${baseUrl}/customers`
const productsUrl = `${baseUrl}/products`


document.addEventListener("DOMContentLoaded", () => {
    getAds()
    getProducts()
    getCompanies()
    
    
    // const adPromise = getAds
    // const productPromise = getProducts
    // const companyPromise = getCompanies
    // Promise.all([adPromise, productPromise, companyPromise]).then((res) => console.log(res))
})

function getAds() {
    fetch(adUrl)
    .then(res => res.json())
    .then(json => json.forEach(ad => adCard(ad)))
}

function adCard(ad) {
    // console.log(ad)
    let container = document.getElementById("ad-container")
    let li = document.createElement("li")
    li.classList.add("ad-card")
    li.id = ad.company_id
    container.appendChild(li)
}

let products

function getProducts() {
    fetch(productsUrl)
    .then(res => res.json())
    .then(json => {
        products = json;
        json.forEach(p => productCard(p))
    })
}

function productCard(product) {
    // console.log(product)
    let li = document.getElementById(`${product.company_id}`)
    li.innerHTML = `
        <h3>${product.name}</h3>
        <img src=${product.image}>$${product.price}
    `
}

function getCompanies() {
    fetch(companyUrl)
    .then(res => res.json())
    .then(json => json.forEach(company => companyCard(company)))
}

// function companyCard(company) {
//     products.forEach(product => {
//         let li = document.getElementById(company.id)
//         li.innerHTML = ` <h2>${company.name}</h2>
//         <h3>${product.name}</h3>
//         <img src=${product.image}>$${product.price}
//         `
//     })
// }

