"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsRoute = void 0;
const productsmodel_1 = require("../models/productsmodel");
const authorization_1 = require("./authorization");
const p = new productsmodel_1.productMethods();
const create = async (req, res) => {
    try {
        const product = {
            name: req.body.name,
            price: req.body.price,
        };
        const create = await p.create(product);
        res.status(201);
        res.json(create);
    }
    catch (err) {
        //solving confilct of sending two responses while token absence
        if (!res.json()) {
            res.status(400).json('' + err);
        }
    }
};
const index = async (req, res) => {
    try {
        const index = await p.index();
        res.status(200);
        res.json(index);
    }
    catch (err) {
        res.status(400);
        res.json('' + err);
    }
};
const show = async (req, res) => {
    try {
        const show = await p.show(req.params.id);
        res.json(show);
    }
    catch (err) {
        res.status(400);
        res.json('' + err);
    }
};
const productsRoute = async (app) => {
    app.post('/product', authorization_1.authToken, create);
    app.get('/product', index);
    app.get('/product/:id', show);
};
exports.productsRoute = productsRoute;
