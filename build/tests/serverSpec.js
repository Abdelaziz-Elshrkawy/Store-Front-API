"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const test = (0, supertest_1.default)(server_1.default);
describe('Testing server main Route', () => {
    it('should give http status code 200 and text(Hello World!)', async () => {
        const homePage = await test.get('/');
        expect(homePage.status).toBe(200);
        expect(homePage.text).toBe('Hello World!');
    });
    it('homePage error', async () => {
        const homePage = await test.get('/nonapi');
        expect(homePage.status).toBe(404);
    });
});
