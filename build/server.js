"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const userhandler_1 = require("./handlers/userhandler");
const productshandler_1 = require("./handlers/productshandler");
const ordershandler_1 = require("./handlers/ordershandler");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3000;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.get('/', (_req, res) => {
    res.status(200).send('Hello World!');
});
(0, userhandler_1.userRoute)(app);
(0, productshandler_1.productsRoute)(app);
(0, ordershandler_1.ordersRoute)(app);
app.listen(port, () => {
    console.log(`starting app on: ${port}`);
});
exports.default = app;
