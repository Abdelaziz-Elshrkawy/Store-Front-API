import supertest from 'supertest';
import app from '../server';

const test = supertest(app);

describe('Testing server main Route', (): void => {
  it('should give http status code 200 and text(Hello World!)', async (): Promise<void> => {
    const homePage = await test.get('/');
    expect(homePage.status).toBe(200);
    expect(homePage.text).toBe('Hello World!');
  });
  it('homePage error', async (): Promise<void> => {
    const homePage = await test.get('/nonapi');
    expect(homePage.status).toBe(404);
  });
});
