const express = require("express");
const app = express();
const cors = require("cors");
const items = require("./cart-routes");


var corsOptions = {
    origin: 'http://localhost:3000/',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use("/cart-items", items);
app.use(cors());

app.get('/:id', cors(corsOptions), function (req, res, next) {
    res.json({
        msg: 'This is CORS-enabled for all origins!'
    })
})

app.listen(3000, function () {
    console.log('CORS-enabled web server listening on port 3000')
})

app.get("/", (request, response) => {
    response.json("Cart Items");
});