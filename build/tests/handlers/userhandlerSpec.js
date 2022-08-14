"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testuser = void 0;
const server_1 = __importDefault(require("../../server"));
const supertest_1 = __importDefault(require("supertest"));
const test = (0, supertest_1.default)(server_1.default);
exports.testuser = {
    firstname: 'qwe',
    lastname: 'qwe',
    password: 'qwe',
};
describe('Testing user route 1=>', () => {
    it('expect index to return http code 401', async (done) => {
        done();
        const index = await test.get('/user');
        expect(index.status).toBe(401);
    });
    it('expect show to return http code 401', async (done) => {
        done();
        const show = await test.get('/user/1');
        expect(show.status).toBe(401);
    });
});
describe('Testing user route 2=>', () => {
    it('expect show to return http code 200', async (done) => {
        done();
        const token = await (await test.post('/user').send(exports.testuser)).body;
        const index = await test
            .get('/user/1')
            .set('Authorization', 'bearer ' + token);
        expect(index.status).toBe(200);
    });
    it('expect index to return http code 200', async (done) => {
        done();
        const token = await (await test.post('/user').send(exports.testuser)).body;
        const index = await test
            .get('/user')
            .set('Authorization', 'bearer ' + token);
        expect(index.status).toBe(200);
    });
    it('expect create to return http code 401', async (done) => {
        done();
        const create = await test.get('/user');
        expect(create.status).toBe(401);
    });
});
