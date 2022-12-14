"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
const { host, database, test_database, user, password, ENV } = process.env;
let connect;
console.log('\n' + 'Running on ' + ENV + ' Database' + '\n');
if (ENV === 'test') {
    connect = new pg_1.Pool({
        host: host,
        database: test_database,
        user: user,
        password: password,
    });
}
if (ENV === 'dev') {
    connect = new pg_1.Pool({
        host: host,
        database: database,
        user: user,
        password: password,
    });
}
exports.default = connect;
