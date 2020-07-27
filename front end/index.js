document.addEventListener("DOMContentLoaded", {
    getPosts()
})

function getPosts() {
    fetch("http://localhost:3000/posts")
    .then(res => res.json())
    .then(json => console.log(json))
}