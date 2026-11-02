//constant to store the json location
const ADDRESS = 'products.json';

// array to store cart items
let cart = [];

// constant to store the filter dropdown element
const FILTER = document.getElementById('filterDropdown');

/**
 * @param {} - no params
 * @returns {} - doesnt return anything
 * When the dropdown is changed, remove all product cards
 * then await the info from the json file.
 * Switch case figures out what filter is being used, applies
 * the appropriate sorting algorithm, then replaces the old
 * product list but using the sorted products array.
 */
FILTER.addEventListener('change',async () => {

    let items = document.querySelectorAll('.productGridItem');
    // Iterates through every product card
    for (const item of items){
        item.remove();
    };

    // await causes the program to wait for a response
    carsArr = await getCars(ADDRESS);
    
    // Switch case selects the correct 
    // algorithm for the right selected value.
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
    // Fills the grid with the ordered products array
    createCarList(carsArr);
})

/**
 * 
 * @param {*} ADDRESS the location of the data to be used
 * @returns {RESPONSE} - the data from the file is returned in a json format
 * 
 * Response is fetched from the address and returned
 * in JSON format.
 */

async function getCars(ADDRESS){
    const RESPONSE = await fetch(ADDRESS);
    return RESPONSE.json();//returns car list
};

/**
 * 
 * @param {*} cars Array of products
 * @returns {} nothing
 * 
 * For every product in the cars array, create a card / item for it.
 * Then add content and styling to each item.
 * Add each of the items / cards to a grid of products
 */

function createCarList(cars){
    const productGrid = document.getElementById("productGrid");
    
    // iterates through every car in the product array
    for(const car of cars){
        // Creates all of the elements along with the styling and content

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

        /**
         * @params - No params
         * @returns - Doesn't return anything
         * Removes the original unordered list and replaces it with
         * a new one once it is updated. The total cost of all cart
         * items is calculated and presented alongside the list of cart items
         * that has also been sorted by product ID order.
         */

        addToCartBtn.addEventListener('click', () => {
            document.getElementById('cartULTag').remove();
            console.log("Old removed")
            // Stores data for the product interacted with
            let addedItem = cars.filter((product) => product.productID == car.productID);

            // adds the JSON dictionary selected to the cart array
            cart.push(
                addedItem[0]
            );

            // Creates the container for the list
            let cartULTag = document.createElement('ul');
            cartULTag.setAttribute('id','cartULTag');

            // Sorts the data by product ID
            cart.sort((a,b) => a.productID - b.productID)

            let totalCost = 0;

            for (const item of cart){
                // Creates the list item and adds content
                let currentItem = document.createElement('li');
                currentItem.textContent = "| "+item.productID+" | "+item.make+" | "+item.model+" | £"+item.price+" |";
                cartULTag.append(currentItem);

                // Sums the total cost
                totalCost += item.price;
            }

            // Adds the list to the page
            document.getElementById('cartListDiv').append(cartULTag);

            // Removes old total cart cost
            document.getElementById('cartCost').remove();

            // Creates the total cost label and edits it accordingly
            let totalCostLbl = document.createElement('p');
            totalCostLbl.textContent = "Price: £"+totalCost;
            totalCostLbl.setAttribute('id','cartCost')
            
            // Adds the total cost label to the page
            document.getElementById('cartListDiv').append(totalCostLbl)
        });

        // Constructs the elements by appending the
        // different elements to eachother
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

/**
 * 
 * @param {*} ADDRESS contains the location of the file that data is fetched from
 * calls the other functions within itself to start the program
 */

async function init(ADDRESS){
    createCarList(await getCars(ADDRESS));
}

// Starts the program.
init(ADDRESS);