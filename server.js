const express = require('express');

const fs = require('fs/promises')
const path = require('path')
const app = express();
const PORT = process.env.PORT || 3000;

const cors = require('cors');

async function getProducts(){
    const data = await fs.readFile(
        path.join(__dirname, 'products.json'),
        'utf8'
    );

    return JSON.parse(data);
};

app.use(cors({
  origin: 'http://127.0.0.1:5500', // Replace with your frontend URL -- 
  credentials: true,               // Allow cookies/auth headers
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.listen(3000);

app.listen(PORT, () => {
    console.log(`Japanese Car Shop server is running at http://localhost:${PORT}`);
});

app.get('/api/products', async (req, res) => {
    const products = await getProducts();
    res.json(products);
});

app.get('/',(req,res) => {
    res.send("Server working")
})