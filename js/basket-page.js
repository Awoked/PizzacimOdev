let basketWrapper = document.querySelector('.basket-wrapper');
let basketSubTotal = document.querySelector('.sub-totalWrapper');
let specialPizza = JSON.parse(localStorage.getItem("SPECIALPIZZA"));
// LOCAL STORAGE DA DATA VARSA DEVAM ET
function renderCartItems() {
    // Clear
    basketWrapper.innerHTML = "";

    // Local storage check
    if (localStorage.getItem('CART') != null) { 
        let cart = JSON.parse(localStorage.getItem("CART"));
        cart.forEach((cart) => {
            basketWrapper.innerHTML += `
                <div class="card w-100">
                    <div class="card-body">
                        <div class="d-flex justify-content-between gap-2">
                            <div class="d-flex gap-2">
                                <img src="../${cart.imageSource}" class="img-fluid w-25 rounded" alt="">
                                <div class="d-flex flex-column justify-content-between">
                                    <h5 class="card-title m-0 p-0">${cart.title}</h5>                
                                    <div>
                                        <button class="btn btn-warning plus px-3" onclick="changeNumberOfUnits('plus', ${cart.id});">+</button>
                                        <span>${cart.numberOfUnits}</span>
                                        <button class="btn btn-warning minus px-3" onclick="changeNumberOfUnits('minus', ${cart.id});">-</button> 
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex flex-column justify-content-between">
                                <button class="btn-close align-self-end" onclick="removeItemFromCart(${cart.id})"></button>
                                <h4 class="card-text align-self-end">${cart.price}TL</h4>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
    }
    if (localStorage.getItem('SPECIALPIZZA') != null) {
        basketWrapper.innerHTML += `
        <div class="card w-100 specialPizza">
            <div class="card-body d-flex flex-row justify-content-between">
                <div class="d-flex flex-row">
                    <div class="img-fluid w-100 rounded" >
                        ${localStorage.getItem('PIZZAIMG')}
                    </div>
                    <div class="d-flex gap-2">
                        <div class="d-flex flex-column flex-wrap">
                            <h5 class="card-title m-0 p-0 text-start">Özel Pizza</h5>                
                            <div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="d-flex flex-column justify-content-between">
                    <button class="btn-close align-self-end" onclick="removeSpecialPizza();"></button>
                    <h4 class="card-text align-self-end">${specialPizza.totalPrice}TL</h4>
                </div>
            </div>
        </div>
        `;
    }
}
renderCartItems();


// function changeNumberOfUnits(action, id) {
    
//     let cart = JSON.parse(localStorage.getItem("CART")); 
//     if (action == "plus" && id === ) {
//         cart.numberOfUnits++;
//         console.log(cart.numberOfUnits);
//         renderCartItems();
//     }
// }

// Toplam fiyat hesaplama
function renderSubTotal() {
    let cart = JSON.parse(localStorage.getItem("CART")); 
    let totalPrice = 0, totalItems = 0;
    cart.forEach((item)=>{
        totalPrice += item.price * item.numberOfUnits;
        totalItems += item.numberOfUnits;
    });
    if (specialPizza != null) {
        if (specialPizza.totalPrice != null) {
            totalPrice += specialPizza.totalPrice;
        }
    }
    basketSubTotal.innerHTML =  `Toplam: ${totalPrice}TL`
}
// Toplam fiyatı çalıştır
renderSubTotal();

function changeNumberOfUnits(action, id) {
    let cart = JSON.parse(localStorage.getItem("CART")); 
    cart.forEach((item)=>{
        if (item.id === id) {
            if (action === 'minus' && item.numberOfUnits > 1) {
                item.numberOfUnits--;
            } else if (action === 'plus'){
                item.numberOfUnits++;
            }
            localStorage.setItem("CART", JSON.stringify(cart));
        }
    });
    renderCartItems();
    renderSubTotal();
}

// Sepetten onclick oldugu itemin id sini kontrol edip siler
function removeItemFromCart(id) {
    let cart = JSON.parse(localStorage.getItem("CART")); 
    cart = cart.filter( (item) => item.id !== id);
    localStorage.setItem("CART", JSON.stringify(cart));
    renderCartItems();
    renderSubTotal();
}

function removeSpecialPizza() {
    let specialPizzaEl = document.querySelector('.specialPizza');    
    specialPizzaEl.remove();
    specialPizza = {};
    localStorage.setItem("SPECIALPIZZA", JSON.stringify(specialPizza));
    localStorage.removeItem('SPECIALPIZZA');
    renderSubTotal();
}

// local storage daki kartın arrayini bos yaparak sepetteki bütün itemleri siliyor
function removeAllItemsFromCart() {
    let cart = JSON.parse(localStorage.getItem("CART")); 
    cart = [];
    specialPizza = {};
    localStorage.setItem("SPECIALPIZZA", JSON.stringify(specialPizza));
    localStorage.setItem("CART", JSON.stringify(cart));
    localStorage.removeItem('PIZZAIMG');
    localStorage.removeItem('SPECIALPIZZA');
    renderCartItems();
    renderSubTotal();
}