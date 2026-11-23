const form = document.getElementById('addForm');
const message = document.getElementById('message');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const body = {
        make: document.getElementById('make').value,
        model: document.getElementById('model').value,
        price: Number(document.getElementById('price').value),
        stock: Number(document.getElementById('stock').value),
        startYear: Number(document.getElementById('startYear').value),
        endYear: Number(document.getElementById('endYear').value),
        topSpeed: Number(document.getElementById('topSpeed').value),
        hp: Number(document.getElementById('hp').value),
        torque: Number(document.getElementById('torque').value),
    };
    try {
        const response = await fetch('api/products', {
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        });
        const data = await response.json();
        message.textContent = response.ok
        ? `Added: ${data.name} (id ${data.id})`
        : `Error: ${data.error}`;
    } catch (error) {
        message.textContent = 'Could not reach the server';
    }
    window.location = "index.html"
});