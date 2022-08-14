"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const productsmodel_1 = require("../../models/productsmodel");
const test = new productsmodel_1.productMethods();
describe('Testing products model =>', () => {
    it('Testing output of create method', async () => {
        const p = {
            name: 'book2',
            price: 123,
        };
        const product = await test.create(p);
        expect(product).toEqual({
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            id: 2,
            name: 'book2',
            price: 123,
        });
    });
    it('Testing output of index method', async () => {
        expect((await test.index()).length).toBe(1);
        expect(await test.index()).toEqual([{ id: 1, name: 'book1', price: 123 }]);
    });
    it('Testing output of show method', async () => {
        expect(await test.show(1)).toEqual({
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            id: 1,
            name: 'book1',
            price: 123,
        });
    });
});
