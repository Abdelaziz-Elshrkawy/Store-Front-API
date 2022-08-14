"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordersMethods = void 0;
const database_1 = __importDefault(require("../database"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class ordersMethods {
    async create(o) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'insert into orders (user_id, status) values ($1, $2) returning *';
            const data = await conn.query(sql, [o.user_id, o.status]);
            conn.release();
            return data.rows[0];
        }
        catch (err) {
            throw new Error('' + err);
        }
    }
    async index(user_id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'select op.order_id, op.product_id, op.quantity, orders.user_id, orders.status from order_product op join orders on op.order_id = orders.id where orders.user_id = ($1)';
            const data = await conn.query(sql, [user_id]);
            conn.release();
            return data.rows;
        }
        catch (err) {
            throw new Error('' + err);
        }
    }
    async show(user_id, order_id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'select op.order_id, op.product_id, op.quantity, orders.user_id, orders.status from order_product op join orders on op.order_id = orders.id where orders.user_id = ($1) and op.order_id =  ($2)';
            const data = await conn.query(sql, [user_id, order_id]);
            conn.release();
            return data.rows;
        }
        catch (err) {
            throw new Error('' + err);
        }
    }
    async addProduct(p) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'select status from orders where id =($1)';
            const data = await (await conn.query(sql, [p.order_id])).rows[0];
            conn.release();
            if (data.status === 'complete') {
                return "can't add more products because the order is completed";
            }
        }
        catch (err) {
            throw '' + err;
        }
        try {
            const conn = await database_1.default.connect();
            const sql = 'insert into order_product (product_id, quantity, order_id) values ($1, $2, $3) returning *';
            const data = await conn.query(sql, [
                p.product_id,
                p.quantity,
                p.order_id,
            ]);
            conn.release();
            return data.rows[0];
        }
        catch (err) {
            throw '' + err;
        }
    }
    async orderConfirmation(order_id, user_id) {
        const conn = await database_1.default.connect();
        const sql = "update orders o set status = 'complete' where o.id = ($1) and o.user_id = ($2) ";
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const data = await conn.query(sql, [order_id, user_id]);
        conn.release();
    }
}
exports.ordersMethods = ordersMethods;
