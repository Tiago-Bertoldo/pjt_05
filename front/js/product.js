// REQUETE API
function requeteApi (){
    fetch('http://localhost:3000/api/products')
    .then(function(e){
        return e.json()
    })
    .then(function(e){
        return  valueProducts(e);
    })
    .catch (function(err){
        console.log('errp')
    })
   

}

// GET LE URL DE LA PAGE
function recebUrl() {
    const getUrl = window.location.href
    return utlisantUrl(getUrl)
}

// TRAIT LE URL DE LA PAGE
function utlisantUrl(getUrl){
    let str = getUrl;
    let url = new URL(str)
    let id = url.searchParams.get('id')
    return id
}

//SET VALUES DANS LA PAGE PRODUIT
function valueProducts (e) {
    let retUrl = recebUrl()
    let productName = document.querySelector('#title')
    let productPrice = document.querySelector('#price')
    let productImg = document.querySelector('.item__img')
    let productDescription = document.querySelector('#description')
    let productColor = document.querySelector('#colors')
    for(ids of e){
        if(ids._id === retUrl){
            // SET PRICE
            productPrice.textContent = ids.price;

            // SET NAME
            productName.textContent = ids.name;

            //SET DESCRIPTION
            productDescription.textContent = ids.description;

            // SET IMG
            let imgElement = document.createElement('img')
            imgElement.setAttribute('src' , `${ids.imageUrl}`)
            productImg.appendChild(imgElement);

            //SET VALUES (COLORS)
                for(idsArray of ids.colors){
                    let t = document.createTextNode (idsArray)
                    let createOption = document.createElement('option')
                    createOption.setAttribute('value' , idsArray)
                    productColor.appendChild(createOption)
                    createOption.appendChild(t)
                }
            }    
        }

    }


// START EVENT FUNCTION
let getSubmit = document.querySelector('#addToCart')
getSubmit.addEventListener('click' , (e) => {
    e.preventDefault()
    validateInput();

});


validateInput = () => {
    let getQuantity = document.querySelector('#quantity').value
    let getColors = document.querySelector('#colors').value

    if(getQuantity < 1) {{
        getQuantity = 1;
    }}
    if(getColors === '') {
        alert('Valeur incorrect , sil vous plat regardez le champ vide')
    }else {
        return getValue(getQuantity , getColors)
    }
    



    
}


//CREATION DU OBJ QUE EST ADD DANS LE ARRAY LOCALSTORAGE
function setValues (id , colors , qta){
    this.id = id;
    this.colors = colors,
    this.qta = qta
        return {
            id , colors , qta
        }
   }


// GET VALUES DANS LE LOCALSTORAGE
getValue = (getQuantity , getColors) => {
    // Get value DOM

    let getUrl = recebUrl()
    if(localStorage.getItem('values') == null) {
        localStorage.setItem('values' , '[]')
    } 
    old_values = JSON.parse(localStorage.getItem('values'))
    let valueObj ;
    if(old_values.length === 0) {
        valueObj = new setValues(getUrl , getColors, getQuantity)
        old_values.push(valueObj)
        localStorage.setItem('values' , JSON.stringify(old_values))
    }else {
            valueObj = new setValues(getUrl , getColors, getQuantity)
            return setProduitPanier (old_values , valueObj);
        
    }

}   



// SET PRODUITS DANS LE PANIER
setProduitPanier = (old_values , valueObj) => {
    let getQuantity = document.querySelector('#quantity').value
    let getColors = document.querySelector('#colors').value
    let getUrl = recebUrl()
    let modal = false ;
    let qtaTransf;
    let objTransf;
    let setId;
    let setFloatAdd;
    let index ;
    // TESTE SI LE PRODUUIT EXISTE 
    if(old_values.length > 0) {
        for(let i of old_values) {
            if(i.id === valueObj.id && i.colors === valueObj.colors) {
                modal = true
                qtaTransf = parseInt(i.qta)
                objTransf = parseInt(valueObj.qta)
                setValuesAdd = qtaTransf + objTransf 
                setFloatAdd = String(setValuesAdd)        
                index = old_values.findIndex(i => i.id === valueObj.id && valueObj.colors == i.colors) 
                old_values.splice(index , 1)
            }
        }    
    }
    // ADD PRODUITE QUI N'EXISTE PAS
    if(modal) {
        newValeurs = new setValues(getUrl , getColors, setFloatAdd)
        old_values.push(newValeurs)
        localStorage.setItem('values' , JSON.stringify(old_values))
        location.reload();

    }else {
        old_values.push(valueObj)
        localStorage.setItem('values' , JSON.stringify(old_values))
        console.log('Deu bom')
        location.reload();
    }
}






refresh = (time) => {    
    setTimeout(function () {
        location.reload()
    }, time);
}



function main () {
    requeteApi()
}

main();



