let customPizza = [
    {
        startPrice : 50,
        cheesePrice : 10,
        pepperoniPrice : 10,
        cornPrice : 5,

        // Sonradan boyut olarak kullandım
        thickPastry : 5,
        standartPastry : 0,
        thinPastry : -3,


        totalPrice : 0,

        inceHamur : -3,
        kalinHamur : 5,
        standartHamur : 0
    }
];


// Element Secimi
let pizzaCard = document.querySelector('.custom-pizza-body');
let addToCartBtn = document.querySelector('.addToCart');
// Pizza elementlerini card ın içine renderlamak için
function customPizzaRender() {
    customPizza.forEach((items) => {
        pizzaCard.innerHTML = `
        <div class="d-flex flex-row align-items-center justify-content-between">
        <label for="cheese"><span class="fw-bold">Peynir</span><span class="text-secondary"> +${items.cheesePrice}TL</span></label>
        <input type="button" class="btn btn-warning" class="p-0" value="+" id="cheese" >
        </div>
        <div class="d-flex flex-row align-items-center justify-content-between">
            <label for="pepperoni"><span class="fw-bold">Pepperoni</span><span class="text-secondary"> +${items.pepperoniPrice}TL</span></label>
            <input type="button" class="btn btn-warning" class="p-0" value="+" id="pepperoni">
        </div>
        <div class="d-flex flex-row align-items-center justify-content-between">
            <label for="corn"><span class="fw-bold">Mısır</span><span class="text-secondary"> +${items.cornPrice}TL</span></label>
            <input type="button" class="btn btn-warning" class="p-0" value="+" id="corn" >
        </div>
        <div class="d-flex flex-row align-items-center justify-content-between">
            <label for="thinPastry"><span class="fw-bold">Küçük Boy</span><span class="text-secondary"> ${items.thinPastry}TL</span></label>
            <input type="button" class="btn btn-warning" class="p-0" value="+" id="thinPastry" name="pastry" >
        </div>
        <div class="d-flex flex-row align-items-center justify-content-between">
            <label for="standartPastry"><span class="fw-bold">Orta Boy</span><span class="text-secondary"> ${items.standartPastry}TL</span></label>
            <input type="button" class="btn btn-warning" class="p-0" value="+" id="standartPastry" name="pastry" >
        </div>
        <div class="d-flex flex-row align-items-center justify-content-between">
            <label for="thickPastry"><span class="fw-bold">Büyük Boy</span><span class="text-secondary"> +${items.thickPastry}TL</span></label>
            <input type="button" class="btn btn-warning" class="p-0" value="+" id="thickPastry" name="pastry">
        </div>
        <div class="d-flex flex-row align-items-center justify-content-between">
            <label for="inceHamur"><span class="fw-bold">İnce Hamur</span><span class="text-secondary"> ${items.inceHamur}TL</span></label>
            <input type="button" class="btn btn-warning" class="p-0" value="+" id="inceHamur" name="pastry">
        </div>
        <div class="d-flex flex-row align-items-center justify-content-between">
            <label for="kalinHamur"><span class="fw-bold">Kalın Hamur</span><span class="text-secondary"> +${items.kalinHamur}TL</span></label>
            <input type="button" class="btn btn-warning" class="p-0" value="+" id="kalinHamur" name="pastry">
        </div>
        <div class="d-flex flex-row align-items-center justify-content-between">
            <label for="standartHamur"><span class="fw-bold">Standart Hamur</span><span class="text-secondary"> +${items.standartHamur}TL</span></label>
            <input type="button" class="btn btn-warning" class="p-0" value="+" id="standartHamur"">
        </div>
        <div class="d-flex flex-column gap-2 w-100">
            <div class="d-flex w-100 rounded p-2 justify-content-end bg-warning">
                <span class="fw-bold">Toplam: <span class="specialPizzaPrice">50</span> TL</span>
            </div>
            <div class="d-flex flex-row gap-2">
                <button class="btn btn-outline-warning py-2 w-50 addToCart">Sepete Ekle</button>
                <button class="btn btn-outline-warning py-2 w-50" onclick="resetChoice();">Seçimleri Sıfırla</button>
            </div>
        </div>
        `;
        console.log(items);
    });
}




customPizzaRender();


// Sepete eklemek icin



// Toplam price
function totalPrice() {
    let subtotal = document.querySelector('.specialPizzaPrice');
    customPizza.forEach((items) => {    
        localStorage.setItem("SPECIALPIZZA", JSON.stringify(items));
    });
    customPizza.forEach((items) => {
        items.totalPrice = items.startPrice;
        subtotal.innerHTML = items.totalPrice;
    });
}

// Reset choices
function resetChoice() {
    customPizza.forEach((items) => {
        console.log(items);
        items.startPrice = 50;
        items.totalPrice = 0;
        totalPrice()
    });
    document.querySelectorAll('.slice1').forEach((items)=>{items.style.display = "none";});
    document.querySelectorAll('.slice2').forEach((items)=>{items.style.display = "none";});
    document.querySelectorAll('.slice3').forEach((items)=>{items.style.display = "none";});
    document.querySelectorAll('.slice4').forEach((items)=>{items.style.display = "none";});
    document.querySelectorAll('.cheese').forEach((items)=>{items.style.display = "none";});

    let pepperoni = document.querySelectorAll('.pepperoni-wrapper');
    pepperoni.forEach((pepperoni) => {
        pepperoni.style.display = "none";
    });
    let corn = document.querySelectorAll('.corn-wrapper');
    corn.forEach((corn) => {
        corn.style.display = "none";
    });
    pastry.classList.add('pastry-standart');
    pastry.classList.remove('pastry-thin');
    pastry.classList.remove('pastry-thick');

    standartPastryBtn.classList.remove('disabled');
    thinPastryBtn.classList.remove('disabled');
    thickPastryBtn.classList.remove('disabled');

    pepperoniBtn.classList.remove('disabled');
    cheeseBtn.classList.remove('disabled');
    cornBtn.classList.remove('disabled');
}



// Element Seçimi
let standartPastryBtn = document.querySelector('#standartPastry');
let thinPastryBtn = document.querySelector('#thinPastry');
let thickPastryBtn = document.querySelector('#thickPastry');
let pastry = document.querySelector('.pastry');
let pepperoniBtn = document.querySelector('#pepperoni');
let cheeseBtn = document.querySelector('#cheese');
let cornBtn = document.querySelector('#corn');
let kalinHamur = document.querySelector('#kalinHamur');
let inceHamur = document.querySelector('#inceHamur');
let standartHamur = document.querySelector('#standartHamur');
let hamurKalinlikEl = document.querySelector('.kalinlik');


// kalinlik kontrolleri

kalinHamur.addEventListener("click", () => {
    hamurKalinlikEl.style.height = "20px";     
    kalinHamur.classList.add("disabled");
    customPizza.forEach((items) => {
        items.startPrice += items.kalinHamur;
        totalPrice();
    });
    cartRender();
});
inceHamur.addEventListener("click", () => {
    hamurKalinlikEl.style.height = "4px";       
    inceHamur.classList.add("disabled");
    customPizza.forEach((items) => {
        items.startPrice += items.inceHamur;
        totalPrice();
    });
    cartRender();
});
standartHamur.addEventListener("click", () => {
    hamurKalinlikEl.style.height = "8px";       
    standartHamur.classList.add("disabled");
    customPizza.forEach((items) => {
        items.startPrice += items.standartHamur;
        totalPrice();
    });
    cartRender();
});


// standart boy Kontrolü
standartPastryBtn.addEventListener("click", function standartPastryCheck() {
    let slice1 = document.querySelectorAll('.slice1');
    let slice2 = document.querySelectorAll('.slice2');
    let slice3 = document.querySelectorAll('.slice3');
    let slice4 = document.querySelectorAll('.slice4');
        pastry.classList.add('pastry-standart');
        pastry.classList.remove('pastry-thin');
        pastry.classList.remove('pastry-thick');
        standartPastryBtn.classList.add('disabled');
        slice1.forEach((slice1) => {
            slice1.style.display = "none";
        });
        slice2.forEach((slice2)=>{
            slice2.style.display = "none";
        });
        slice3.forEach((slice3)=>{
            slice3.style.display = "none";
        });
        slice4.forEach((slice4)=>{    
            slice4.style.display = "none";
        })
        slice1.forEach((slice1) => {
            slice1.style.display = "block";
        });
        slice2.forEach((slice2)=>{
            slice2.style.display = "block";
        });
        slice3.forEach((slice3)=>{
            slice3.style.display = "block";
        });
        customPizza.forEach((items) => {
            items.startPrice += items.standartPastry;
            totalPrice();
        });
        cartRender();
});

// Küçük Boy Kontrolü
thinPastryBtn.addEventListener("click", function thinPastryCheck() {
    let slice1 = document.querySelectorAll('.slice1');
    let slice2 = document.querySelectorAll('.slice2');
    let slice3 = document.querySelectorAll('.slice3');
    let slice4 = document.querySelectorAll('.slice4');
        thinPastryBtn.classList.add('disabled');
        pastry.classList.remove('pastry-standart');
        pastry.classList.add('pastry-thin');
        pastry.classList.remove('pastry-thick');
        slice1.forEach((slice1) => {
            slice1.style.display = "none";
        });
        slice2.forEach((slice2)=>{
            slice2.style.display = "none";
        });
        slice3.forEach((slice3)=>{
            slice3.style.display = "none";
        });
        slice4.forEach((slice4)=>{    
            slice4.style.display = "none";
        })
        slice1.forEach((slice1) => {
            slice1.style.display = "block";
        });
        slice2.forEach((slice2)=>{
            slice2.style.display = "block";
        });
        customPizza.forEach((items) => {
            items.startPrice += items.thinPastry;            
            totalPrice();
        });
        cartRender();
}); 

// Büyük boy Kontrolü
thickPastryBtn.addEventListener("click", function thinPastryCheck() {
        
        // Styling
        let slice1 = document.querySelectorAll('.slice1');
        let slice2 = document.querySelectorAll('.slice2');
        let slice3 = document.querySelectorAll('.slice3');
        let slice4 = document.querySelectorAll('.slice4');
        thickPastryBtn.classList.add('disabled');
        pastry.classList.remove('pastry-standart');
        pastry.classList.remove('pastry-thin');
        pastry.classList.add('pastry-thick');
        slice1.forEach((slice1) => {
            slice1.style.display = "block";
        });
        slice2.forEach((slice2)=>{
            slice2.style.display = "block";
        });
        slice3.forEach((slice3)=>{
            slice3.style.display = "block";
        });
        slice4.forEach((slice4)=>{    
            slice4.style.display = "block";
        })
        
        customPizza.forEach((items) => {
            items.startPrice += items.thickPastry;      
            totalPrice();
        });
        cartRender();
});   

// Peynir Kontrolü
cheeseBtn.addEventListener("click", function cheeseAdd() {
    let cheese = document.querySelectorAll('.cheese');
    cheese.forEach((cheeseItems)=>{
        cheeseItems.style.display = "flex";
    })
    customPizza.forEach((items) => {
        items.startPrice += items.cheesePrice;      
        totalPrice();
    });
    cheeseBtn.classList.add('disabled');
    cartRender();
});

// Pepperoni Kontrolü
pepperoniBtn.addEventListener("click", function pepperoniAdd() {
    let pepperoni = document.querySelectorAll('.pepperoni-wrapper');
    pepperoni.forEach((pepperoni) => {
        pepperoni.style.display = "flex";
    });
    customPizza.forEach((items) => {
        items.startPrice += items.pepperoniPrice;      
        totalPrice();
    });
    pepperoniBtn.classList.add('disabled');
    cartRender();
});

// Mısır kontrolü
cornBtn.addEventListener("click", function cornAdd() {
    let corn = document.querySelectorAll('.corn-wrapper');
    corn.forEach((corn) => {
        corn.style.display = "flex";
    });
    customPizza.forEach((items) => {
        items.startPrice += items.cornPrice;      
        totalPrice();
    });
    cornBtn.classList.add('disabled');
    cartRender();
});



// Sepete ekle
let basketBtn = document.querySelector('.addToCart');
let basket = document.querySelector('.offcanvas-cardSection');
let subTotalEl = document.querySelector('.subtotal');


function cartRender() {
    for (let i = 0; i <= 2; i++) {
        let localCartInfo = JSON.parse(localStorage.getItem("SPECIALPIZZA"));
        console.log('for');
        console.log(localCartInfo);
        if (localCartInfo != null) {
            basket.innerHTML = `
            <div class="card w-100 specialPizzaItem">
                <div class="card-body d-flex flex-column">
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
                    <div class="d-flex flex-column justify-content-between">
                        <button class="btn-close align-self-end" onclick="removeItem();"></button>
                        <h4 class="card-text align-self-end">${localCartInfo.totalPrice}TL</h4>
                    </div>
                </div>
            </div>
            `;
            subTotalEl.innerHTML = localCartInfo.totalPrice; 
        }
    }
}

// Sepetteki itemi silme 

function removeItem() {
    customPizza = null ; 
    localStorage.setItem("SPECIALPIZZA", JSON.stringify(customPizza));
    document.querySelector('.specialPizzaItem').remove();
    localStorage.removeItem('SPECIALPIZZA');
    localStorage.removeItem('PIZZAIMG');
    totalPrice();
}

// Sepete ekleme butonu
basketBtn.addEventListener("click", function addToBasket() {  
    console.log("onpress");
    let customPizzaImage = document.querySelector('.custom-pizza-image');
    localStorage.setItem("PIZZAIMG", customPizzaImage.outerHTML);
    totalPrice();
    cartRender();
});

cartRender();