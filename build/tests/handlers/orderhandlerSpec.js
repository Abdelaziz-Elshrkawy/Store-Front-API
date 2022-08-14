"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const userhandlerSpec_1 = require("./userhandlerSpec");
const test = (0, supertest_1.default)(server_1.default);
const testorder = {
    user_id: 1,
    status: 'active'
};
describe('Testing order route =>', () => {
    it('expect create to return http code 401', async () => {
        const create = await test.post('/order/user/1');
        expect(create.status).toBe(401);
    });
    it('expect create to return http code 200', async () => {
        const token = await (await test.post('/user').send(userhandlerSpec_1.testuser)).body;
        const create = await test
            .post('/order/user/1')
            .set('Authorization', 'bearer ' + token)
            .send(testorder);
        expect(create.status).toBe(200);
    });
    it('expect index to return http code 401', async () => {
        const index = await test.get('/order');
        expect(index.status).toBe(401);
    });
    it('expect index to return http code 200', async (done) => {
        done();
        const token = await (await test.post('/user').send(userhandlerSpec_1.testuser)).body;
        const index = await test
            .get('/order')
            .set('Authorization', 'bearer ' + token);
        expect(index.status).toBe(200);
    });
    it('expect show to return http code 401', async () => {
        const show = await test.get('/order/:order_id/user/:user_id');
        expect(show.status).toBe(401);
    });
    it('expect show to return http code 200', async (done) => {
        done();
        const token = await (await test.post('/user').send(userhandlerSpec_1.testuser)).body;
        const show = await test
            .get('/order/:order_id/user/:user_id')
            .set('Authorization', 'bearer ' + token);
        expect(show.status).toBe(200);
    });
    it('expect addProduct to return http code 401', async () => {
        const addProduct = await test.post('/order/:id/product');
        expect(addProduct.status).toBe(401);
    });
});
