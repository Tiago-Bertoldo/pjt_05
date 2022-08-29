// // REQUETE API
function oneProduit(){
    let retUrl = recebUrl()
    fetch(`http://localhost:3000/api/products/${retUrl}`)
    .then(function(e){
        return e.json()
    })
    .then(function(e){
        return valueProducts(e);
    })
}
// GET LE URL DE LA PAGE
function recebUrl() {
    const getUrl = window.location.href
    return utlisantUrl(getUrl)
}
// TRAITE LE URL DE LA PAGE
function utlisantUrl(getUrl){
    let str = getUrl;
    let url = new URL(str)
    let id = url.searchParams.get('id')
    return id
}
//SET VALUES DANS LA PAGE PRODUIT
function valueProducts (e) {
    let ids = e
    let productName = document.querySelector('#title')
    let productPrice = document.querySelector('#price')
    let productImg = document.querySelector('.item__img')
    let productDescription = document.querySelector('#description')
    let productColor = document.querySelector('#colors')
     if(ids){
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



// START EVENT FUNCTION AVEC LE CLICK 
let getSubmit = document.querySelector('#addToCart')
getSubmit.addEventListener('click' , (e) => {
    e.preventDefault()
    validateInput();
});
// VALIDATION DE L'INPUT QTA ET COULEURS.
validateInput = () => {
    let getQuantity = document.querySelector('#quantity').value
    let getColors = document.querySelector('#colors').value
    if(getQuantity < 1 || getQuantity > 100) {{
        getQuantity = 1;
    }}
    if(getColors === '') {
        alert('Mauvaise valeur si le champ est vide.')
    }else {
        return getValue(getQuantity , getColors)
    }    
}
//CREATION DU OBJ QUE CE SERA ADD DANS LE ARRAY LOCALSTORAGE
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
// ##SET PRODUITS DANS LE PANIER###
setProduitPanier = (old_values , valueObj) => {
    let getColors = document.querySelector('#colors').value
    let getUrl = recebUrl()
    let modal = false ;
    let qtaTransf;
    let objTransf;
    let setFloatAdd;
    let index ;
    // ###TESTE SI IL Y A CE PRODUIT###
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
    // ##ADD PRODUIT QUI N'EXISTE PAS##
    if(modal) {
        newValeurs = new setValues(getUrl , getColors, setFloatAdd)
        old_values.push(newValeurs)
        localStorage.setItem('values' , JSON.stringify(old_values))
        alert('produit ajouter au panier')
    }else {
        old_values.push(valueObj)
        localStorage.setItem('values' , JSON.stringify(old_values))
        alert('Produit ajouter au panier')
    }
}
// CHARGER LA PAGE POUR INITIALISER LE CONTENU.
window.addEventListener('load' , function(e) {
    oneProduit()
})