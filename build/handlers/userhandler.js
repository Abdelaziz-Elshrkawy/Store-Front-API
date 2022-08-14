"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const usersmodel_1 = require("../models/usersmodel");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authorization_1 = require("./authorization");
const users = new usersmodel_1.userMethods();
const indexUser = async (req, res) => {
    try {
        const index = await users.index();
        res.status(200);
        res.json(index);
    }
    catch (err) {
        //solving conflict of sending two responses while token absence
        if (!res.json()) {
            res.status(400).json('' + err);
        }
    }
};
const createUser = async (req, res) => {
    try {
        const data = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            hashed_password: req.body.password,
        };
        const newUser = await users.create(data);
        const token = jsonwebtoken_1.default.sign({ newUser }, process.env.JWT_SECRET);
        res.status(201);
        res.json(token);
    }
    catch (err) {
        res.status(400).json('' + err);
    }
};
const showUser = async (req, res) => {
    try {
        const showUser = await users.show(req.params.id);
        res.status(200);
        res.json(showUser);
    }
    catch (err) {
        //solving conflict of sending two responses while token absence
        if (!res.json()) {
            res.status(400).json('' + err);
        }
    }
};
const authUser = async (req, res) => {
    try {
        if (await users.authentication(req.body.firstname, req.body.lastname, req.body.password)) {
            res.status(200).json('login success');
        }
        else
            res.status(400).json('login failed');
    }
    catch (err) {
        res.json('' + err);
    }
};
const userRoute = async (app) => {
    app.get('/user', authorization_1.authToken, indexUser);
    app.get('/user/:id', authorization_1.authToken, showUser);
    app.post('/user', createUser);
    app.get('/login', authUser);
};
exports.userRoute = userRoute;
