"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orderesmodel_1 = require("../../models/orderesmodel");
const test = new orderesmodel_1.ordersMethods();
describe('Testing orders model =>', () => {
    it('Testing output of index method', async () => {
        expect(await test.index(1)).toEqual([
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            { order_id: 1, product_id: 1, quantity: 5, user_id: 1, status: 'active' },
        ]);
    });
    it('Testing output of create method', async () => {
        const o = {
            user_id: '1',
            status: 'active',
        };
        expect(await test.create(o)).toEqual({
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            id: 3,
            user_id: 1,
            status: 'active',
        });
    });
    it('Testing output of show method', async () => {
        expect(await test.show(1, 1)).toEqual([
        /*      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
             //@ts-ignore
             { order_id: 1, product_id: 1, quantity: 5, user_id: 1, status: 'active' },*/
        ]);
    });
    it('Testing output of addProduct method', async () => {
        const p = {
            product_id: '1',
            quantity: '5',
            order_id: '1',
        };
        expect(await test.addProduct(p)).toEqual({
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            id: 1,
            product_id: 1,
            quantity: 5,
            order_id: 1,
        });
    });
});
