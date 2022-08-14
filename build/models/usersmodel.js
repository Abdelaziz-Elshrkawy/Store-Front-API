"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMethods = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
dotenv_1.default.config();
//using .env bcrybt varibales
const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
class userMethods {
    async index() {
        const conn = await database_1.default.connect();
        const sql = 'select * from users';
        const data = await conn.query(sql);
        return data.rows;
    }
    async create(u) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'insert into users ( firstname, lastname,  hashed_password) values ($1, $2, $3) returning *';
            const hashedPassword = bcrypt_1.default.hashSync(u.hashed_password + BCRYPT_PASSWORD, parseInt(SALT_ROUNDS));
            const data = await conn.query(sql, [
                u.firstname,
                u.lastname,
                hashedPassword,
            ]);
            conn.release();
            return data.rows[0];
        }
        catch (err) {
            throw new Error('' + err);
        }
    }
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'select * from users where id=($1)';
            const data = await conn.query(sql, [id]);
            conn.release();
            return data.rows;
        }
        catch (err) {
            throw new Error('' + err);
        }
    }
    async authentication(firstname, lastname, password) {
        const conn = await database_1.default.connect();
        const sql = 'select * from users where firstname=($1) and lastname=($2)';
        const data = await conn.query(sql, [firstname, lastname]);
        conn.release();
        if (data.rows.length) {
            const user = data.rows[0];
            if (bcrypt_1.default.compareSync(password + BCRYPT_PASSWORD, user.hashed_password)) {
                return user;
            }
        }
        return null;
    }
}
exports.userMethods = userMethods;
