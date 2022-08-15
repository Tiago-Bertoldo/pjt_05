getIdOrder = ( getUrl) => {
    let retUrl = recebUrl()
    let getMsgOrder = document.querySelector('#orderId')
    localStorage.clear('values')
    getMsgOrder.textContent = retUrl
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
    let id = url.searchParams.get('order')
    return id
}


main = () => {
    getIdOrder()
}

main()