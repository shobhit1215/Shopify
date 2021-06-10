var updateBtns = document.getElementsByClassName('update-cart')

for(var i=0;i<updateBtns.length;i++){
    updateBtns[i].addEventListener('click',function(){
        var productid =this.dataset.product
        var action = this.dataset.action
        console.log('productid:',productid,'actiuon:',action)

        console.log('USER:',user)
        if(user == 'AnonymousUser')
        {
            addCookieItem(productid,action)
        }
        else{
            UpdateUserOrder(productid,action)
        }

    })

}

function addCookieItem(productID,action)
{
    console.log('Not logged in user')
    if (action == 'add'){
        if( cart[productID]==undefined){
            cart[productID] = {'quantity':1}

        }
        else{
            cart[productID]['quantity'] +=1
        }
    }
    if (action == 'remove'){
        cart[productID]['quantity'] -=1
        if(cart[productID]['quantity'] <= 0)
        {
            console.log('Item should be deleted')
            delete cart[productID]
        }
    }
    console.log(cart)
    document.cookie = 'cart=' + JSON.stringify(cart) + ";domain=;path=/"
    location.reload()
}


function UpdateUserOrder(productID,action){
    console.log('logged in')
    var url = '/update_item/'
    fetch(url, {
        method:'POST',
        headers:{
            'content-Type':'application/json',
            'X-CSRFToken':csrftoken,
        },
        body:JSON.stringify({'productID':productID,'action':action})
    })
    .then((response)=>{
        return response.json()
    })
    .then((data)=>{
        console.log('data:',data)
        location.reload()
    })

}