"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const authToken = async (req, res, next) => {
    try {
        const Data = req.headers.authorization;
        const token = Data?.split(' ')[1];
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const decoding = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
    }
    catch (err) {
        res.status(401).json('' + err);
    }
    next();
};
exports.authToken = authToken;
