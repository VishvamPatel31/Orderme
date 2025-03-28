import {menu as foodmenu} from '/data/data.js'
const menu = document.getElementById("menu") 
// let cartactive = false;
const shippedmssg = document.getElementById('shippedmssg')
const cart = document.getElementById("itemsincart")
const totalprice = document.getElementById("totalmoney")
const totalcart = document.getElementById("total")
const fullcart = document.getElementById("Cart")
const hr = document.getElementById("hr")
const completeorder = document.getElementById('completebtn')
let total = 0
let totalcount = 0


console.log(totalcount)
// ------------------------------------------------------ MENU FUNCTIONALITY---------------------------------------------------- //

function rendermenu(){
    let html = ''
    foodmenu.forEach(function(food, index){
        html +=  `
                    <div class="items">
                            <div class="itemsmain" data-index="${index}">
                                <image class="itemimg" src="${food.image}"></image>
                                <div class="item-description">
                                    <p class="food"> ${food.name} </p>
                                    <p class="toppings"> ${food.toppings} </p>
                                    <p class="price"> $ ${food.price} </p>
                                </div>
                                <button class="addbtn"> + </button>
                                <button class="subtractbtn"> - </button>
                            </div>
                        </div>
        `
    })
    console.log(html)
    menu.innerHTML = html
}
rendermenu()

// ------------------------------------------------------ CART FUNCTIONALITY---------------------------------------------------- //


menu.addEventListener('click', function(e){
    if (e.target.classList.contains("addbtn")){
        const object = foodmenu[e.target.closest(".itemsmain").dataset.index]
        object.count += 1
        totalcount += 1
        rendercart()
    } else if( e.target.classList.contains("subtractbtn")){
        const object = foodmenu[e.target.closest(".itemsmain").dataset.index]
        if (object.count > 0){
            object.count -= 1
            totalcount -= 1
            rendercart()
        }
    }
})

function rendercart(){
    if (totalcount > 0) {
        fullcart.classList = ''
        totalcart.classList = 'totalincart'
        hr.classList = 'seperation'
        completeorder.classList = 'completeorder'
    } else {
        // Hide cart if empty
        fullcart.classList = 'present'
        totalcart.classList = 'present'
        hr.classList = 'present'
        completeorder.classList = 'present'
    }

    cart.innerHTML = ' '
    total = 0

    foodmenu.forEach(food => {
        if (food.count >0 ){
            cart.innerHTML += `<div class="itemcart">  
                    <p class="foodincart"> ${food.name} [  ${food.count}  ]</p>
                    <p class="priceincart">$${food.price}</p>
                </div>`
        total += food.count * food.price
        }
    })
    totalprice.innerHTML = `$ ${total}`

}

// ------------------------------------------------------ PAYMENT FUNCTIONALITY---------------------------------------------------- //
const paymentab = document.getElementById('paymenttab')

completebtn.addEventListener('click', function(){
    renderPayment()
})

function renderPayment(){
    paymentab.classList = " "
    paymentab.innerHTML = ` 
            <button id="closebtn"> X </button>
            <h3> Enter card details</h3>
            <label for="name"> Full Name</label>
            <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                required
            >
            <label for="cardnumber"> Card Number</label>
            <input
                type="number"
                id="cardnumber"
                name="cardnumber"
                placeholder="Enter your cardnumber"
                required
            >
            <label for="cvv"> CVV</label>
            <input
                type="text"
                id="cvv"
                name="cvv"
                placeholder="Enter CVV"
                required
            >
            <button type="button" id="submitbtn"> Pay </button>`

            const closebtn = document.getElementById('closebtn')
            closebtn.addEventListener('click', function(){
                closepayment()
            })

            const submitbtn = document.getElementById('submitbtn')
            
            submitbtn.addEventListener('click', function(e){
                e.preventDefault() // <- prevents default form submission
                closepayment()
                fullcart.classList = 'present'
                totalcart.classList = 'present'
                hr.classList = 'present'
                completeorder.classList = 'present'
                shippedmssg.classList = 'ordershipped'

            })
            
}

function closepayment(){
    paymentab.classList = "present"
}


// ---------------------------------------------NEW ORDER BTN----------------------------------------------------- //

const neworderbtn = document.getElementById('neworderbtn')

neworderbtn.addEventListener('click', function () {
    // Reset all counts
    foodmenu.forEach(item => item.count = 0)

    // Reset totals
    total = 0
    totalcount = 0

    // Reset UI
    rendercart()
    shippedmssg.classList = 'present'
})

// -------------------------------------------------------------------------------------------------------------- //