
//routes/products.js
const express = require('express');
const router = express.Router();


let products = [
    {
        "id":1,
        "make": "Nissan",
        "model": "Silvia S15",
        "startYear": 1999,
        "endYear": 2002,
        "hp": 250,
        "torque": 274,
        "topSpeed": 150,
        "stock": 9,
        "price":23000
    },

    {
        "id":2,
        "make": "Nissan",
        "model": "180sx",
        "startYear": 1989,
        "endYear":1998,
        "hp": 175,
        "torque": 276,
        "topSpeed": 145,
        "stock": 3,
        "price":23000
    },
    
    {
        "id": 3,
        "make": "Toyota",
        "model": "AE86 Trueno",
        "startYear": 1983,
        "endYear": 1987,
        "hp": 128,
        "torque": 140,
        "topSpeed": 130,
        "stock": 1,
        "price":15000
    },
    
    {
        "id": 4,
        "make": "Mitsubishi",
        "model": "3000GT",
        "startYear": 1992,
        "endYear": 1995,
        "hp": 282,
        "torque": 407,
        "topSpeed": 155,
        "stock": 5,
        "price":10000
    },
    
    {
        "id": 5,
        "make": "Subaru",
        "model": "Impreza WRX STI",
        "startYear": 2002,
        "endYear": 2005,
        "hp": 300,
        "torque": 413,
        "topSpeed": 153,
        "stock": 4,
        "price":25000
    },
    
    {
        "id": 6,
        "make": "Honda",
        "model": "Civic Type R EK9",
        "startYear": 1997,
        "endYear": 2000,
        "hp": 185,
        "torque": 160,
        "topSpeed": 140,
        "stock": 6,
        "price":20000
    },
    
    {
        "id": 7,
        "make": "Honda",
        "model": "NSX",
        "startYear": 1990,
        "endYear": 2005,
        "hp": 280,
        "torque": 215,
        "topSpeed": 172,
        "stock": 2,
        "price":100000
    },
    
    {
        "id": 8,
        "make": "Mazda",
        "model": "Miata NA",
        "startYear": 1989,
        "endYear": 1994,
        "hp": 130,
        "torque": 135,
        "topSpeed": 121,
        "stock": 18,
        "price":3000
    }
];


router.get('/', (req,res) => {
    const {id, make, model, sort} = req.query;
    let result = [...products];

    if (id) {
        result = result.find(p => p.id === Number(id))
    };

    if (model) {
        result = result.filter(p => p.model.toLowerCase() === model.toLowerCase())
    };

    if (make) {
        result = result.filter(p => p.make.toLowerCase() === make.toLowerCase());
    };

    if (sort !== "None"){
        switch (sort) {
            case "priceLoHi":
                result = result.sort((a,b) => a.price - b.price);
                break;

            case "priceHiLo":
                result = result.sort((a,b) => b.price - a.price);
                break;
            
            case "ageLoHi":
                result = result.sort((a,b) => a.startYear - b.startYear)
                break;
            
            case "ageHiLo":
                result = result.sort((a,b) => b.startYear - a.startYear)
                break;
            
            case "stockLoHi":
                result = result.sort((a,b) => a.stock - b.stock)
                break;
            
            case "stockHiLo":
                result = result.sort((a,b) => b.stock - a.stock)
                break;

            default:
                break;
        }
    }

    res.json(result)
})


function parseID(id){
    const x = Number(id);
    return Number.isInteger(x) ? x : null;
};

router.post('/', (req,res) => {
    const { make, model, price, stock = 0, startYear, endYear, hp, topSpeed, torque } =
    req.body ?? {};

    if (typeof model !== 'string' || model.trim() === '') {
        return res.status(400).json({ error: 'model is required' });
    }

    if (typeof price !== 'number' || price < 0) {
        return res.status(400).json({
            error: 'price must be a number, 0 or more'
        });
    }

    if (typeof startYear !== 'number' || startYear < 0) {
        return res.status(400).json({
            error: 'startYear must be a number, 0 or more'
        });
    }

    if (typeof endYear !== 'number' || endYear < 0) {
        return res.status(400).json({
            error: 'endYear must be a number, 0 or more'
        });
    }

    if (typeof hp !== 'number' || hp < 0) {
        return res.status(400).json({
            error: 'hp must be a number, 0 or more'
        });
    }

    if (typeof torque !== 'number' || torque < 0) {
        return res.status(400).json({
            error: 'torque must be a number, 0 or more'
        });
    }

    if (typeof topSpeed !== 'number' || topSpeed < 0) {
        return res.status(400).json({
            error: 'topSpeed must be a number, 0 or more'
        });
    }

    if (typeof make !== 'string' ||
        make.trim() === '') {
            return res.status(400).json({ error: 'category is required' })
        }
    
        const product = {
            id: nextId++,
            model: model.trim(),
            price,
            make: make.trim(),
            stock,
            startYear,
            endYear,
            torque,
            hp,
            topSpeed
        };
        products.push(product);
        res.status(201).json(product);
})

router.get('/', (req,res) => {
    const {category, sort} = req.query;
    const allProducts = db.prepare(`SELECT * FROM products`).all();
    let result = category ? allProducts.filter(p => p.category === category) : allProducts;
    if (sort === 'price') result = [...result].sort((a,b) => a.price - b.price);
    if (sort === 'name') result = [...result].sort((a,b) => a.name.localeCompare(b.name));
    res.json();
})



module.exports = router;