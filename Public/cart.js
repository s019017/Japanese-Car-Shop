let cart = localStorage.getItem('cart');
console.log(cart);
const cartList = document.getElementById('cartList');
cart = JSON.parse(cart)
console.log(cart[1])
cart.forEach((product) => {
    const listItem = document.createElement('li');
    
    const makeLbl = document.createElement('p');
    makeLbl.textContent = product.make;
    const modelLbl = document.createElement('p');
    modelLbl.textContent = product.model;
    const priceLbl = document.createElement('p');
    priceLbl.textContent = product.price;

    listItem.append(makeLbl, modelLbl, priceLbl);
    cartList.append(listItem);
})
/*
fetch('api/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        model:'Rav 4', price: 50000,
        make: 'Toyota', stock: 3,
        hp: 230, topSpeed:120,
        startYear: 1994, endYear: 2026,
        torque: 103
    })
}).then(r => r.json()).then(console.log);
    */