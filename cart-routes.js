const express = require("express");
const items = express.Router();
const cors = require("cors");


const cartItems = require("./cart-items");

items.use(express.json());
items.use(cors());

items.get("/", (request, response) => {
    response.json(cartItems);
});


items.get("/:id", (req, res) => {
    let selectedItem = cartItems[req.params.id];
    if (selectedItem) {
        res.status(200).json(selectedItem);
    } else {
        res.status(404).json("ID NOT FOUND");
    }
});

items.post("/", (request, response) => {
    cartItems.push({
        id: request.body.id,
        product: request.body.product,
        price: request.body.price,
        quantity: request.body.quantity
    });
    response.status(201).json(cartItems);
});

items.put("/:id", (request, response) => {
    cartItems[request.params.id] = request.body;
    response.json(cartItems[request.params.id]);
});


items.delete("/:id", (request, response) => {
    let selectedItem = cartItems.find((i) => i.id == request.params.id);;
    let selectedIndex = cartItems.indexOf(selectedItem);
    if (selectedItem) {
        cartItems.splice(selectedIndex, 1);
        response.status(204).send();
    } else {
        response.status(404).json("That product isn't available!");
    }
});



module.exports = items;