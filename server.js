const express = require('express');

const fs = require('fs/promises')
const path = require('path')
const app = express();
const PORT = process.env.PORT || 3000;

async function getProducts(){
    const data = await fs.readFile(
        path.join(__dirname, 'products.json'),
        'utf8'
    );

    return JSON.parse(data);
};

app.listen(PORT, () => {
    console.log(`Japanese Car Shop server is running at http://localhost:${PORT}`);
});

app.get('/api/products', async (req, res) => {
    const products = await getProducts();
    res.json(products);
});