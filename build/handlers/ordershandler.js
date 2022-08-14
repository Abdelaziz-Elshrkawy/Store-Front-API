"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordersRoute = void 0;
const orderesmodel_1 = require("../models/orderesmodel");
const authorization_1 = require("./authorization");
const order = new orderesmodel_1.ordersMethods();
const create = async (req, res) => {
    try {
        const data = {
            user_id: req.params.id,
            status: req.body.status,
        };
        const create = await order.create(data);
        res.status(200).json(create);
    }
    catch (err) {
        //solving conflict of sending two responses while token absence
        if (!res.json()) {
            res.status(400).json('' + err);
        }
    }
};
const index = async (req, res) => {
    try {
        const index = await order.index(req.body.user_id);
        res.status(200).json(index);
    }
    catch (err) {
        //solving conflict of sending two responses while token absence
        if (!res.json()) {
            res.status(400).json('' + err);
        }
    }
};
const show = async (req, res) => {
    try {
        const show = await order.show(req.params.user_id, req.params.order_id);
        res.status(200).json(show);
    }
    catch (err) {
        //solving conflict of sending two responses while token absence
        if (!res.json()) {
            res.status(400).json('' + err);
        }
    }
};
const addProduct = async (req, res) => {
    try {
        const data = {
            product_id: req.body.product_id,
            quantity: req.body.quantity,
            order_id: req.params.id,
        };
        const addProduct = await order.addProduct(data);
        res.status(200).json(addProduct);
    }
    catch (err) {
        //solving conflict of sending two responses while token absence
        if (!res.json()) {
            res.status(400).json('' + err);
        }
    }
};
const orderConfirmation = async (req, res) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const confirm = await order.orderConfirmation(req.body.order_id, req.params.id);
        res.status(200).json('order confirmed');
    }
    catch (err) {
        //solving conflict of sending two responses while token absence
        if (!res.json()) {
            res.status(400).json('' + err);
        }
    }
};
const ordersRoute = async (app) => {
    app.post('/order/user/:id', authorization_1.authToken, create);
    app.get('/order', authorization_1.authToken, index);
    app.get('/order/:order_id/user/:user_id', authorization_1.authToken, show);
    app.post('/order/:id/product', authorization_1.authToken, addProduct);
    app.put('/order/user/:id', authorization_1.authToken, orderConfirmation);
};
exports.ordersRoute = ordersRoute;
