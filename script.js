const ADDRESS = 'products.json';

let cart = [];

const FILTER = document.getElementById('filterDropdown');
FILTER.addEventListener('change',async () => {

    let items = document.querySelectorAll('.productGridItem');
    for (const item of items){
        item.remove();
    };

    carsArr = await getCars(ADDRESS);
    
    switch (FILTER.value) {
        case "priceLoHi":
            carsArr = carsArr.sort((a,b) => a.price - b.price);
            break;

        case "priceHiLo":
            carsArr = carsArr.sort((a,b) => b.price - a.price);
            break;
        
        case "ageLoHi":
            carsArr = carsArr.sort((a,b) => a.startYear - b.startYear)
            break;
        
        case "ageHiLo":
            carsArr = carsArr.sort((a,b) => b.startYear - a.startYear)
            break;
        
        case "stockLoHi":
            carsArr = carsArr.sort((a,b) => a.stock - b.stock)
            break;
        
        case "stockHiLo":
            carsArr = carsArr.sort((a,b) => b.stock - a.stock)
            break;
        
        default:
            break;
    };

    createCarList(carsArr);
})

async function getCars(ADDRESS){
    const RESPONSE = await fetch(ADDRESS);
    return RESPONSE.json();//returns car list
};

function createCarList(cars){
    const productGrid = document.getElementById("productGrid");
    
    
    for(const car of cars){
        
        let listItemContainer = document.createElement('div');
        listItemContainer.classList.add('productGridItem')
        
        let carNameContainer = document.createElement('div');
        carNameContainer.classList.add('productTitleCon')

        let carNameLbl = document.createElement('p');
        carNameLbl.textContent = "| " + car.make + " " + car.model + " |";
        carNameLbl.classList.add('productTitle')

        let productItemContent = document.createElement('div');
        productItemContent.classList.add('productItemContent')


        let yearLbl = document.createElement('p');
        yearLbl.textContent = "| " + car.startYear + "-" + car.endYear + " |";
        
        let hpLbl = document.createElement('p');
        hpLbl.textContent = "| " + car.hp + "HP |";

        let torqueLbl = document.createElement('p');
        torqueLbl.textContent = "| " + car.torque + "Nm |";

        let topSpeedLbl = document.createElement('p');
        topSpeedLbl.textContent = "| " + car.topSpeed + "MPH |";

        let priceLbl = document.createElement('p');
        priceLbl.textContent = "| £" + car.price + " |"

        let stockLbl = document.createElement('p');
        stockLbl.textContent = "| Stock: " + car.stock + " |"

        let addToCartCon = document.createElement('div');
        addToCartCon.classList.add('addToCartCon');

        let addToCartBtn = document.createElement('button');
        addToCartBtn.classList.add('addToCartBtn');
        addToCartBtn.textContent = "🛒 Add to Cart";

        addToCartBtn.addEventListener('click', () => {
            document.getElementById('cartULTag').remove();
            console.log("Old removed")
            let addedItem = cars.filter((product) => product.productID == car.productID);

            cart.push(
                addedItem[0]
            );

            let cartULTag = document.createElement('ul');
            cartULTag.setAttribute('id','cartULTag');

            cart.sort((a,b) => a.productID - b.productID)
            for (const item of cart){
                let currentItem = document.createElement('li');
                currentItem.textContent = "| "+item.productID+" | "+item.make+" | "+item.model+" |";
                cartULTag.append(currentItem);
            }
            document.getElementById('cartListDiv').append(cartULTag);
        });

        carNameContainer.append(carNameLbl)
        listItemContainer.append(carNameContainer)

        productItemContent.append(yearLbl);
        productItemContent.append(hpLbl);
        productItemContent.append(torqueLbl);
        productItemContent.append(topSpeedLbl);
        productItemContent.append(priceLbl);
        productItemContent.append(stockLbl);

        listItemContainer.append(productItemContent);

        addToCartCon.append(addToCartBtn)
        listItemContainer.append(addToCartCon);
        
        
        productGrid.append(listItemContainer);
    };

};

async function init(ADDRESS){
    createCarList(await getCars(ADDRESS));
}

init(ADDRESS);