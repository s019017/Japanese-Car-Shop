const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req,res) =>{
    res.send("Node working")
})

app.listen(PORT, () => {
    console.log(`Node is working at http://localhost:${PORT}`);
});