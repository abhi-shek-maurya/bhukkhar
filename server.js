const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

const PORT = 3000;
const ordersFile = path.join(__dirname, 'orders.json');

app.use(express.static('public'));
app.use(express.json());

let orders = [
    { id: "12345", customer: "Rahul", status: "Preparing", lat: 25.6, lng: 85.1 }
];

// Serve orders
app.get('/api/orders', (req, res) => {
    res.json(orders);
});

// Update order status
app.post('/api/update-status', (req, res) => {
    const { order_id, status } = req.query;
    const order = orders.find(o => o.id === order_id);
    if (order) {
        order.status = status;
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});

// For customer tracking
app.get('/api/get-order-status', (req, res) => {
    const { order_id } = req.query;
    const order = orders.find(o => o.id === order_id);
    if (order) res.json({ status: order.status });
    else res.sendStatus(404);
});

// Location update by delivery boy
app.post('/api/update-location', (req, res) => {
    const { order_id, lat, lng } = req.body;
    const order = orders.find(o => o.id === order_id);
    if (order) {
        order.lat = lat;
        order.lng = lng;
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});

// Get location for customer
app.get('/api/get-location', (req, res) => {
    const { order_id } = req.query;
    const order = orders.find(o => o.id === order_id);
    if (order) {
        res.json({ lat: order.lat, lng: order.lng });
    } else {
        res.sendStatus(404);
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
