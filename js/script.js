// Eleman secimi
const pizzaCardContainer = document.querySelector(".cards-wrapper");
const cartItems = document.querySelector(".offcanvas-cardSection");
const subTotal = document.querySelector(".subtotal");

// Pizza cardlarini olusturma
function cards() {
    
    pizzas.forEach((pizzas) => {
        // malzemeleri string degerinde yazdirmak icin
        let pepperoni = pizzas.ingredients.pepperoni == true ? "var" : "yok";
        let cheese = pizzas.ingredients.cheese == true ? "var" : "yok";
        let olive = pizzas.ingredients.olive == true ? "var" : "yok";
        let corn = pizzas.ingredients.corn == true ? "var" : "yok";

        // pizzalari icinde tutan dive += atamasi ile pizza cardı ekler
        pizzaCardContainer.innerHTML +=
            `
                <div class="card">
                    <img src="${pizzas.imageSource}" class="card-img-top" alt="">
                    <div class="card-body text-center">
                        <h5 class="card-title fw-bold">${pizzas.title}</h5>
                    </div>
                        <ul class="list-group list-group-flush border-0 px-1">
                            <li class="list-group-item border-0 p-1">P<span class="text-warning">epperoni:</span>${pepperoni}</></li>
                            <li class="list-group-item border-0 p-1">P<span class="text-warning">eynir:</span> ${cheese}</li>
                            <li class="list-group-item border-0 p-1">Z<span class="text-warning">eytin:</span> ${olive}</li>
                            <li class="list-group-item border-0 p-1">M<span class="text-warning">ısır:</span> ${corn}</li>
                            <li class="list-group-item border-0 p-0 fw-bolder align-self-end px-1">${pizzas.price}TL</li>
                        </ul>
                    <div class="card-body">
                        <button class="w-100 btn btn-warning text-light" onclick="addToCart(${pizzas.id})">
                            Sepete Ekle
                        </button>
                    </div>
                </div>
        `;
        localStorage.setItem("CART", JSON.stringify(pizzas));
    });
    
};
cards();

// local storage

let cart = JSON.parse(localStorage.getItem("CART"));
updateCart();

// Sepete ekle
function addToCart(id) {

    // Sepete pizza eklendiginde sepetin rengini degistir
    document.querySelector('.shBasket').classList.add('text-danger');
    document.querySelector('.shBasket').classList.remove('text-black');


    // Sepette zaten bir pizza varsa
    if (cart.some((item ) => item.id === id)){
        changeNumberOfUnits("plus", id);
    } else{
        const item = pizzas.find((pizza) => pizza.id === id );
        cart.push({
            ...item,
            numberOfUnits : 1
        });

    }

    updateCart();
}

// Update cart
function updateCart() {
    renderCartItems();
    renderSubTotal();

    // Pizza kartlarını local storage de kaydetme
    localStorage.setItem("CART", JSON.stringify(cart));
}

// Toplam fiyat hesaplama
function renderSubTotal() {
    let totalPrice = 0, totalItems = 0;
    cart.forEach((item)=>{
        totalPrice += item.price * item.numberOfUnits;
        totalItems += item.numberOfUnits;
    });
    subTotal.innerHTML =  `${totalPrice}`
}

// Pizza kartlarını olusturdugumuz aynı mantık
function renderCartItems() {
    cartItems.innerHTML = ""; // clear
    cart.forEach((item)=>{
        cartItems.innerHTML += `
        <div class="card w-100">
            <div class="card-body d-flex">
                <div class="d-flex gap-2">
                    <img src="${item.imageSource}" class="img-fluid w-25 rounded" alt="">
                    <div class="d-flex flex-column">
                        <h5 class="card-title m-0 p-0">${item.title}</h5>                
                        <div>
                            <button class="btn btn-warning plus px-3" onclick="changeNumberOfUnits('plus', ${item.id})">+</button>
                            <span>${item.numberOfUnits}</span>
                            <button class="btn btn-warning minus px-3" onclick="changeNumberOfUnits('minus', ${item.id})">-</button> 
                        </div>
                    </div>
                </div>
                <div class="d-flex flex-column justify-content-between">
                    <button class="btn-close align-self-end" onclick="removeItemFromCart(${item.id})"></button>
                    <h4 class="card-text align-self-end">${item.price}TL</h4>
                </div>
            </div>
        </div>
        `
    });
}


// Sepetten item silme 
function removeItemFromCart(id) {
    cart = cart.filter( (item) => item.id !== id);
    updateCart();

}


// changeNumberOfUnits 

function changeNumberOfUnits(action, id) {
    
    cart = cart.map((item)=> {
        let numberOfUnits = item.numberOfUnits;

        if (item.id === id){
            if (action === "minus" && numberOfUnits > 1){
                numberOfUnits--;
            }else if (action === "plus") {
                numberOfUnits++;
            }
        }
        return {
            ...item,
            numberOfUnits,
        };
    });
    updateCart()
}