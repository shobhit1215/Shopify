var updateBtns = document.getElementsByClassName('update-cart')

for(var i=0;i<updateBtns.length;i++){
    updateBtns[i].addEventListener('click',function(){
        var productid =this.dataset.product
        var action = this.dataset.action
        console.log('productid:',productid,'actiuon:',action)

        console.log('USER:',user)
        if(user == 'AnonymousUser')
        {
            console.log('Not logged in user')
        }
        else{
            UpdateUserOrder(productid,action)
        }

    })

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