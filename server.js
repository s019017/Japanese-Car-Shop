const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

const productRouter = require('./routes/products.js')

app.use(express.json());
app.use(express.static('Public'));
app.use('/api/products',productRouter);


app.listen(PORT, () => {
    console.log(`Japanese Car Shop server is running at http://localhost:${PORT}`);
});

/*app.get('/api/products', async (req, res) => {
    res.json(products);
});*/

app.use(express.static(path.join(__dirname, 'Public')));