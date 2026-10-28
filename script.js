const ADDRESS = 'products.json';


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


        carNameContainer.append(carNameLbl)
        listItemContainer.append(carNameContainer)

        productItemContent.append(yearLbl);
        productItemContent.append(hpLbl);
        productItemContent.append(torqueLbl);
        productItemContent.append(topSpeedLbl);


        listItemContainer.append(productItemContent);

        
        
        productGrid.append(listItemContainer);
    };

};

async function init(ADDRESS){
    createCarList(await getCars(ADDRESS));
}

init(ADDRESS);