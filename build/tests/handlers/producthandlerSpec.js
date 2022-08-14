"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const userhandlerSpec_1 = require("./userhandlerSpec");
const test = (0, supertest_1.default)(server_1.default);
describe('Testing product route =>', () => {
    it('expect create to return http code 401', async () => {
        const create = await test.post('/product');
        expect(create.status).toBe(401);
    });
    it('expect create to return http code 200', async (done) => {
        done();
        const token = await (await test.post('/user').send(userhandlerSpec_1.testuser)).body;
        const create = await test
            .post('/product')
            .set('Authorization', 'bearer ' + token);
        expect(create.status).toBe(200);
    });
    it('expect index to return http code 200', async () => {
        const create = await test.get('/product');
        expect(create.status).toBe(200);
    });
    it('expect show to return http code 200', async (done) => {
        done();
        const create = await test.get('/product/1');
        expect(create.status).toBe(200);
    });
});
