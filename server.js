const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

let inventory = [
  { id: 1, name: 'Face wash wardah', quantity: 10 },
  { id: 2, name: 'Lipcream Wardah', quantity: 20 },
  { id: 3, name: 'Blush On Wardah', quantity: 30 }
];

app.use(bodyParser.json());
app.use(cors());

// Mendapatkan semua data stok barang
app.get('/api/inventory', (req, res) => {
  res.json(inventory);
});

// Mendapatkan data stok barang berdasarkan ID
app.get('/api/inventory/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = inventory.find(item => item.id === id);

  if (item) {
    res.json(item);
  } else {
    res.sendStatus(404);
  }
});

// Menambahkan data stok barang baru
app.post('/api/inventory', (req, res) => {
  const newItem = req.body;
  inventory.push(newItem);
  res.sendStatus(201);
});

// Mengubah data stok barang berdasarkan ID
app.put('/api/inventory/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = inventory.find(item => item.id === id);

  if (item) {
    item.name = req.body.name;
    item.quantity = req.body.quantity;
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

// Menghapus data stok barang berdasarkan ID
app.delete('/api/inventory/:id', (req, res) => {
  const id = parseInt(req.params.id);
  inventory = inventory.filter(item => item.id !== id);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
