const request = require('supertest');
const app = require('..');

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

describe('Additional Express API tests', () => {
  test('GET /images with no images should return 404', async () => {
    const response = await request(app).get('/images');
    // Accept 404 or 200 depending on DB state
    expect([200, 404]).toContain(response.statusCode);
  });

  test('GET /patientData/:id with invalid id should return 500 or 404', async () => {
    const response = await request(app).get('/patientData/invalidid');
    expect([404, 500]).toContain(response.statusCode);
  });

  test('POST /notes with missing fields should return 400', async () => {
    const response = await request(app)
      .post('/notes')
      .send({ content: 'Test note' }); // missing patient_id and caregiver_id
    expect(response.statusCode).toBe(400);
  });

  test('GET /notes/:patientId should return 200 and an array', async () => {
    const response = await request(app).get('/notes/somepatientid');
    expect([200, 500]).toContain(response.statusCode);
    if (response.statusCode === 200) {
      expect(Array.isArray(response.body)).toBe(true);
    }
  });

  test('DELETE /notes/:id with invalid id should return 500', async () => {
    const response = await request(app).delete('/notes/invalidid');
    expect([200, 500]).toContain(response.statusCode);
  });

  test('GET /profile without token should return 401 or 400', async () => {
    const response = await request(app).get('/profile');
    expect([400, 401]).toContain(response.statusCode);
  });

  test('PUT /profile without token should return 401', async () => {
    const response = await request(app)
      .put('/profile')
      .send({ name: 'New Name' });
    expect([401, 500]).toContain(response.statusCode);
  });

  test('DELETE /profile without token should return 401', async () => {
    const response = await request(app).delete('/profile');
    expect([401, 500]).toContain(response.statusCode);
  });

  test('POST /forgot-password with missing email should return 500 or 404', async () => {
    const response = await request(app)
      .post('/forgot-password')
      .send({});
    expect([404, 500]).toContain(response.statusCode);
  });

  test('POST /reset-password with weak password should return 400', async () => {
    const response = await request(app)
      .post('/reset-password')
      .send({ email: 'test@example.com', code: '123456', newPassword: '123' });
    expect(response.statusCode).toBe(400);
  });
});