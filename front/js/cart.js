// Afficher un tableau récapitulatif des achats dans la page Panier

// Appelle API pour tous les information du obj
getApiValues = () => {
    fetch('http://localhost:3000/api/products')
    .then(function(e){
        return e.json()
    })
    .then(function(e){
        setArrayInfo(e)
    })
    .catch (function(err){
        console.log(err)
    })
}


// Create Obj avec tous les information
function newValues (nom , qta , price , img , color , id) {
    this.nom = nom,
    this.qta = qta,
    this.price = price,
    this.img = img
    this.color = color
    this.id = id
    return {
        nom , qta , price , img , color , id
    }
}

// setArrayInfoValues
setArrayInfo = (e) => {
    let newAddItem;
    let old_values = JSON.parse(localStorage.getItem('values'))
    let valueArray = [];
    let calcPP ;
    for (let i of old_values) {
        for (let x of e){
            if(i.id === x._id){
               newAddItem = new newValues ( x.name , i.qta , x.price , x.imageUrl , i.colors , i.id) ;
               valueArray.push(newAddItem)               
           }

        }
    }
    
    return afficheProduit(valueArray) , btnDell(e)
    

}
// affiche tous le produit
afficheProduit = (e) => {
    let cartItems = document.querySelector('#cart__items')
    let getSet = document.querySelector('.cart__item')
    let totalPrice = document.querySelector('#totalPrice')
    let somaDiv = 0 
    for ( let i of e) {
        // SET ARTICLE 
        let article = document.createElement('article')
        article.setAttribute('class' , 'cart__item')
        article.setAttribute('data-id' , `${i.id}`)
        article.setAttribute('data-color' , `${i.color}`)
        cartItems.appendChild(article)
        // SET IMG APPEND
        let imgSrc = document.createElement('div')
        imgSrc.setAttribute('class' , 'cart__item__img')
        article.appendChild(imgSrc)
        let imgSet = document.createElement('img')
        imgSet.setAttribute('src' , `${i.img}`)
        imgSrc.appendChild(imgSet)
        // SET CONTENT DIV
        let content = document.createElement('div')
        content.setAttribute('class' , 'cart__item__content')
        article.appendChild(content)
        let contentDescription = document.createElement('div')
        contentDescription.setAttribute('class' , 'cart__item__content__description')
        content.appendChild(contentDescription)
        let h2 = document.createElement('h2')
        h2.textContent = `${i.nom}`
        contentDescription.appendChild(h2)
        let p = document.createElement('p')
        p.textContent = `${i.color}`
        contentDescription.appendChild(p)
        let p2 = document.createElement('p')
        p2.textContent = `${i.price } € `
        contentDescription.appendChild(p2)

        // SET CONTENT SETTINGS
        let contentSettings = document.createElement('div')
        contentSettings.setAttribute('class' , 'cart__item__content__settings')
        content.appendChild(contentSettings)
        let contentSettingsQta = document.createElement('div')
        contentSettingsQta.setAttribute('class' , 'cart__item__content__settings__quantity')
        contentSettings.appendChild(contentSettingsQta)
        let pQta = document.createElement('p')
        pQta.textContent = `Qté :  ${ i.qta  }  `
        contentSettingsQta.appendChild(pQta)
        let inputValue = document.createElement('input')
        inputValue.setAttribute('type' , 'number')
        inputValue.setAttribute('class' , 'itemQuantity')
        inputValue.setAttribute('min' , '1')
        inputValue.setAttribute('max' , '100')
        inputValue.setAttribute('value' , '0')
        contentSettingsQta.appendChild(inputValue)

           // SET CONTENT SETTINGS DELETE
        let contentSettingsDel = document.createElement('div')
        contentSettingsDel.setAttribute('class' , 'cart__item__content__settings__delete')
        contentSettings.appendChild(contentSettingsDel)

        let inputDell = document.createElement('p')
        inputDell.setAttribute('class' , 'deleteItem')
        inputDell.innerHTML = 'Supprimer'
        contentSettingsDel.appendChild(inputDell)

        somaDiv += i.qta * i.price

        totalPrice.textContent = somaDiv
    }
    
    return calculeQta (e) , getEventClick(e) 
}
// Array resposable pour creer les nouveux produits
function setValues (id , colors , qta){
    this.id = id;
    this.colors = colors,
    this.qta = qta
        return {
            id , colors , qta
        }
   }  
//  set value pour change les qta avec le event Change
   getEventClick = (z) => {
        const values = z
        let somaDiv = 0
        let totalPrice = document.querySelector('#totalPrice')
        let old_values = JSON.parse(localStorage.getItem('values'))
        let getCartItem = document.querySelectorAll('.cart__item')
        let getBtnChange = document.querySelectorAll('.itemQuantity')
        let getTagP = document.querySelectorAll('.cart__item .cart__item__content__settings__quantity > p')
        let getId ;
        let getColor;
        let getNewValue;
        let getQta ;
        //Get les valeur dans la tag Item ID ET COLOR
        for (let i of getCartItem) {
            i.addEventListener('change' , e => {
                getId = i.dataset.id
                getColor = i.dataset.color
                getNewValue = e.target.value
                const index = old_values.findIndex((user)=> user.id === getId && user.colors === getColor)
                newValeurs = new setValues(getId , getColor, getNewValue)
                old_values.splice(index , 1)
                old_values.push(newValeurs)
                localStorage.setItem('values' , JSON.stringify(old_values))
                getTagP[index].textContent = `Qté : ${getNewValue}`
                calculeQta(values)
            })        
        }
   }
// affiche values des qta + price
   calculeQta = (e , somaDiv ) => {
    let old_values = JSON.parse(localStorage.getItem('values'))
    let totalQuantity = document.querySelector('#totalQuantity')
    let totalPrice = document.querySelector('#totalPrice')
    let artC = 0;
    let soma = 0;
    let qta;
    let calculeTotal ;
    for(let i of old_values ) {
        artC += Number(i.qta)
        qta = i.qta
        for(let x of e) {
            soma = artC * x.price
        }
    }

    totalQuantity.textContent = artC
    totalPrice.textContent = soma
}
  
// Delete array avec les produits
   btnDell = (e) => {
    let getCout = document.querySelectorAll('.cart__item')
    let old_values = JSON.parse(localStorage.getItem('values'))
    for (let i of getCout) {
        i.addEventListener('click' , e => {
            getId = i.dataset.id
            getColor = i.dataset.color
            const el = e.target;
            if(el.classList.contains('deleteItem')){
                const index = old_values.findIndex((user)=> user.id === getId)
                old_values.splice(index , 1)
                console.log(old_values)
                localStorage.setItem('values' , JSON.stringify(old_values))
                location.reload();
            }
        })
    }

    
    
    
}

// Validation Item Formulaire

isValid = (value) => {
    return /[a-z]/.test(value);
}

//CREATE OBJ UTILISATEUR
function utilisateur (firstName , lastName , address , city , email , products) {
    this.contact  = {
        firstName : firstName,
        lastName : lastName , 
        address : address, 
        city : city,
        email : email
    }
    this.products = products
}
validationDate = () => {
    let isValid = false
    let btnSubmit = document.querySelector('#order')
    let inpFirst = document.querySelector('#firstName')
    let inpLast = document.querySelector('#lastName')
    let inpAdress = document.querySelector('#address')
    let inpCity = document.querySelector('#city')
    let inpEmail = document.querySelector('#email')

    //SET TEXT MSG
    let fistNameMsg = document.querySelector('#firstNameErrorMsg')
    let msgPrenom = document.querySelector('#lastNameErrorMsg')
    let msgAdress = document.querySelector('#addressErrorMsg')
    let msgCity = document.querySelector('#cityErrorMsg')
    let msgEmil = document.querySelector('#emailErrorMsg')
    let prenom;
    let nom;
    let address ;
    let city ;
    let email;
    btnSubmit.addEventListener('click' , e => {
        e.preventDefault()
        if(!/[a-z]/.test(inpFirst.value)) {
            fistNameMsg.textContent = 'Msg Error'
        }else {
            prenom = inpFirst.value
            fistNameMsg.textContent = ''
            isValid = true
        }
        if(!/[a-z]/.test(inpLast.value)) {
            msgPrenom.textContent = 'Msg Error'
        }else {
            nom = inpLast.value
            msgPrenom.textContent = ''
            isValid = true
        }
        if(!/[a-z]/.test(inpAdress.value)) {
            msgAdress.textContent = 'Msg Error'
        }else {
            address = inpAdress.value
            msgAdress.textContent = ''
            isValid = true
        }
        if(!/[a-z]/.test(inpCity.value)) {
            msgCity.textContent = 'Msg Error'
        }else {
            city = inpCity.value
            msgCity.textContent = ''
            isValid = true
        }
        if(!/@/gm.test(inpEmail.value)) {
            msgEmil.textContent = 'Msg Error'
        }else {
            email = inpEmail.value
            msgEmil.textContent = ''
            isValid = true
        }


      if(isValid) {
          const old_values = JSON.parse(localStorage.getItem('values'))
          const newTablet = []
          const contacts = new utilisateur(prenom , nom  , address , city , email , newTablet)
            for(let i of old_values) {
                newTablet.push(i.id)
            }
        
         fetch("http://localhost:3000/api/products/order", {
        	method: "POST",
            headers: { 
            "Accept": "application/json", 
            "Content-type": "application/json; charset=UTF-8"
        },  
            body : 
                JSON.stringify(contacts)
        })
        .then(function (res) {
            if(res.ok) {
                return res.json()
            }
        })
        .then(function(e){
            setNewPage(e)
        })
        .catch(function(e){
            console.log(e)
        })
    }
    })

}

setNewPage = (e) => {
    localStorage.clear('values')
    window.location.href = `confirmation.html?order=${e.orderId}`    
}



main = () => {
    getApiValues();
    validationDate();
}

main();

