"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productMethods = void 0;
const database_1 = __importDefault(require("../database"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class productMethods {
    async create(p) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'insert into products (name, price) values ($1, $2) returning *';
            const data = await conn.query(sql, [p.name, p.price]);
            conn.release();
            return data.rows[0];
        }
        catch (err) {
            throw new Error('' + err);
        }
    }
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'select * from products';
            const data = await conn.query(sql);
            return data.rows;
        }
        catch (err) {
            throw new Error('' + err);
        }
    }
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'select * from products where id=($1)';
            const data = await conn.query(sql, [id]);
            return data.rows[0];
        }
        catch (err) {
            throw new Error('' + err);
        }
    }
}
exports.productMethods = productMethods;
