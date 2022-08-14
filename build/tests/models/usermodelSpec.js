"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usersmodel_1 = require("../../models/usersmodel");
const test = new usersmodel_1.userMethods();
describe('Testing users model =>', () => {
    it('Testing output of create and authentication method', async () => {
        const u = {
            firstname: 'ahmed',
            lastname: 'ahmed',
            hashed_password: 'ahmed',
        };
        const user = await test.create(u);
        const auth = await test.authentication(u.firstname, u.lastname, u.hashed_password);
        expect(user).toEqual({
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            id: 3,
            firstname: 'ahmed',
            lastname: 'ahmed',
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            hashed_password: auth.hashed_password,
        });
    });
    it('Testing output of index method', async () => {
        expect((await test.index()).length).toBe(2);
    });
    it('Testing output of show method', async () => {
        expect(await test.show(1)).toEqual([
            { id: 1, firstname: 'ali', lastname: 'ali', hashed_password: 'ali' },
        ]);
    });
});
