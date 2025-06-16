const request = require('supertest');
const app = require('./app'); // Import the Express app

describe('Express API basic connectivity', () => {
  test('GET / should return Hello from Express server', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toMatch(/Hello from Express server/);
  });

  test('GET /items should return 200 and an array', async () => {
    const response = await request(app).get('/items');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('GET /notifications should return 200 and an array', async () => {
    const response = await request(app).get('/notifications');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('GET /dosages should return 200 and an array', async () => {
    const response = await request(app).get('/dosages');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('GET /medications should return 200 and an array', async () => {
    const response = await request(app).get('/medications');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('GET /get-all-user should return 200 and an object with data', async () => {
    const response = await request(app).get('/get-all-user');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  test('POST /register with missing fields should return 400', async () => {
    const response = await request(app)
      .post('/register')
      .send({ name: 'Test User', email: 'test@example.com' }); // missing password
    expect(response.statusCode).toBe(400);
  });

  test('POST /login-user with missing fields should return 404 or 401', async () => {
    const response = await request(app)
      .post('/login-user')
      .send({ email: 'notfound@example.com', password: 'wrongpass' });
    expect([401, 404]).toContain(response.statusCode);
  });
});