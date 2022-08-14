import supertest from 'supertest';
import app from '../../server';
import { testuser } from './userhandlerSpec';

const test = supertest(app);
const testorder = {
  user_id: 1,
  status: 'active'
}
describe('Testing order route =>', (): void => {
  it('expect create to return http code 401', async (): Promise<void> => {
    const create = await test.post('/order/user/1');
    expect(create.status).toBe(401);
  });
  it('expect create to return http code 200', async (): Promise<void> => {
    const token = await (await test.post('/user').send(testuser)).body;
    const create = await test
      .post('/order/user/1')
      .set('Authorization', 'bearer ' + token)
      .send(testorder);
    expect(create.status).toBe(200);
  });
  it('expect index to return http code 401', async (): Promise<void> => {
    const index = await test.get('/order');
    expect(index.status).toBe(401);
  });
  it('expect index to return http code 200', async (done): Promise<void> => {
    done();
    const token = await (await test.post('/user').send(testuser)).body;
    const index = await test
      .get('/order')
      .set('Authorization', 'bearer ' + token);
    expect(index.status).toBe(200);
  });
  it('expect show to return http code 401', async (): Promise<void> => {
    const show = await test.get('/order/:order_id/user/:user_id');
    expect(show.status).toBe(401);
  });
  it('expect show to return http code 200', async (done): Promise<void> => {
    done();
    const token = await (await test.post('/user').send(testuser)).body;
    const show = await test
      .get('/order/:order_id/user/:user_id')
      .set('Authorization', 'bearer ' + token);
    expect(show.status).toBe(200);
  });
  it('expect addProduct to return http code 401', async (): Promise<void> => {
    const addProduct = await test.post('/order/:id/product');
    expect(addProduct.status).toBe(401);
  });
});
