const baseUrl = "http://localhost:3000"
const adUrl = `${baseUrl}/ads`
const postUrl = `${baseUrl}/posts`
const companyUrl = `${baseUrl}/companies`
const customerUrl = `${baseUrl}/customers`
const productsUrl = `${baseUrl}/products`
let products

document.addEventListener("DOMContentLoaded", () => {
    getCompanies()
    getAds()
    getProducts()
    
    
    
    // const adPromise = getAds
    // const productPromise = getProducts
    // const companyPromise = getCompanies
    // Promise.all([adPromise, productPromise, companyPromise]).then((res) => console.log(res))
})
function getCompanies() {
    fetch(companyUrl)
    .then(res => res.json())
    .then(json => json.forEach(company => companyCard(company)))
}

function getProducts() {
    fetch(productsUrl)
    .then(res => res.json())
    .then(json => {
        products = json;
        json.forEach(p => productCard(p))
    })
}

function companyCard(company) {
    let div = document.getElementById("ad-container")
    let div2 = document.createElement("div")
    div2.classList.add("ad")
    div2.id = company.id
    div2.innerText = company.name
    div.appendChild(div2)
    let ul = document.createElement("ul")
    div2.appendChild(ul)
    
    // products.forEach(product => {
    //     let li = document.createElement("li")
    //     li.innerHTML = ` <h2>${company.name}</h2>
    //     <h3>${product.name}</h3>
    //     <img src=${product.image}>$${product.price}
    //     `
    //     ul.appendChild(li)

    // })
}

function getAds() {
    fetch(adUrl)
    .then(res => res.json())
    .then(json => json.forEach(ad => adCard(ad)))
}

// function adCard(ad) {
//     // console.log(ad)
//     let container = document.getElementById("ad-container")
//     let li = document.createElement("li")
//     li.classList.add("ad-card")
//     li.id = ad.company_id
//     container.appendChild(li)
// }





function productCard(product) {
    // console.log(product)
    let div = document.getElementById(`${product.company_id}`)
    let ul = div.querySelector("ul")
    let li = document.createElement("li")
    li.className = "product"
    li.innerHTML = `
        <div>
        <h3>${product.name}</h3>
        <img src=${product.image}>
        <br>
        <h3>$${product.price}</h3>

        </div>
    `
    ul.appendChild(li)
}
