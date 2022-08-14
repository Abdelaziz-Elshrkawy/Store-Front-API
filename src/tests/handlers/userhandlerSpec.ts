import app from '../../server';
import supertest from 'supertest';

const test = supertest(app);
export const testuser = {
  firstname: 'qwe',
  lastname: 'qwe',
  password: 'qwe',
};

describe('Testing user route 1=>', (): void => {
  it('expect index to return http code 401', async (done): Promise<void> => {
    done();
    const index = await test.get('/user');
    expect(index.status).toBe(401);
  });
  it('expect show to return http code 401', async (done): Promise<void> => {
    done();
    const show = await test.get('/user/1');
    expect(show.status).toBe(401);
  });
  
});

describe('Testing user route 2=>', (): void =>{
  it('expect show to return http code 200', async (done): Promise<void> => {
    done();
    const token = await (await test.post('/user').send(testuser)).body;
    const index = await test
    .get('/user/1')
    .set('Authorization', 'bearer ' + token);
    expect(index.status).toBe(200);
  });
  it('expect index to return http code 200', async (done): Promise<void> => {
    done();
    const token = await (await test.post('/user').send(testuser)).body;
    const index = await test
      .get('/user')
      .set('Authorization', 'bearer ' + token);
    expect(index.status).toBe(200);
  });
  it('expect create to return http code 401', async (done): Promise<void> => {
    done();
    const create = await test.get('/user');
    expect(create.status).toBe(401);
  });
});