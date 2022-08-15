function requeteApi (){
    fetch('http://localhost:3000/api/products')
    .then(function(e){
        return e.json()
    })
    .then(function(e){
        getDados(e)
    })
    .catch (function(err){
        console.log(err)
    })

}

function getDados(products){
    let item = document.querySelector('#items')
    for(let af of products){
    // CREATE A
    let a = document.createElement('a')
    a.setAttribute('href' , `./product.html?id=${af._id}`)
    item.appendChild(a)
    // CREATE ARTICLE
    let article = document.createElement('article')
    a.appendChild(article)
    // CREATE IMG 
    let img = document.createElement('img')
    img.setAttribute('src' , `${af.imageUrl}`)
    img.setAttribute('alt' , `${af.altTxt}, ${af.name}`)
    article.appendChild(img)
    // CREATE h3
    let h3 = document.createElement('h3')
    h3.classList.add('productName')
    article.appendChild(h3).textContent = `${af.name}`
    // CREATE P
    let p = document.createElement('p')
    article.appendChild(p)
    p.innerHTML = `${af.description}`
 }
}


requeteApi()