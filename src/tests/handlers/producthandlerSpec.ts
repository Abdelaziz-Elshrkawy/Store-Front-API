import supertest from 'supertest';
import app from '../../server';
import { testuser } from './userhandlerSpec';

const test = supertest(app);

describe('Testing product route =>', (): void => {
  it('expect create to return http code 401', async (): Promise<void> => {
    const create = await test.post('/product');
    expect(create.status).toBe(401);
  });
  it('expect create to return http code 200', async (done): Promise<void> => {
    done();
    const token = await (await test.post('/user').send(testuser)).body;
    const create = await test
      .post('/product')
      .set('Authorization', 'bearer ' + token);
    expect(create.status).toBe(200);
  });
  it('expect index to return http code 200', async (): Promise<void> => {
    const create = await test.get('/product');
    expect(create.status).toBe(200);
  });
  it('expect show to return http code 200', async (done): Promise<void> => {
    done();
    const create = await test.get('/product/1');
    expect(create.status).toBe(200);
  });
});
