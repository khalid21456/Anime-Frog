const request = require('supertest');
const express = require('express');
const routes = require('../app/routes/index');

const app = express();
app.use(express.json());
app.use('/', routes);

describe('Routes', () => {
  test('GET / returns welcome message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Welcome to the Express API 🚀');
  });

  test('GET /LandingAnimes returns anime data or 404', async () => {
    const res = await request(app).get('/LandingAnimes');
    expect([200, 404]).toContain(res.statusCode);
    if (res.statusCode === 200) {
      expect(res.body).toHaveProperty('success', true);
      expect(res.body).toHaveProperty('data');
      expect(Array.isArray(res.body.data)).toBe(true);
    } else {
      expect(res.body).toHaveProperty('message', 'No anime data found');
    }
  });

  test('GET /SearchAnime without query returns 400', async () => {
    const res = await request(app).get('/SearchAnime');
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message', 'Search query is required');
  });

  test('GET /SearchAnime with query returns anime data or 404', async () => {
    const res = await request(app).get('/SearchAnime').query({ query: 'Naruto' });
    expect([200, 404]).toContain(res.statusCode);
    if (res.statusCode === 200) {
      expect(res.body).toHaveProperty('success', true);
      expect(res.body).toHaveProperty('data');
      expect(Array.isArray(res.body.data)).toBe(true);
    } else {
      expect(res.body).toHaveProperty('message', 'No anime found for your search query');
    }
  });

  test('GET /details/:id/characters with invalid id returns 400', async () => {
    const res = await request(app).get('/details/invalid/characters');
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message', 'Valid anime ID is required');
  });

  test('GET /details/:id/characters with valid id returns character data or 404', async () => {
    const res = await request(app).get('/details/1/characters');
    expect([200, 404]).toContain(res.statusCode);
    if (res.statusCode === 200) {
      expect(res.body).toHaveProperty('success', true);
      expect(res.body).toHaveProperty('data');
      expect(Array.isArray(res.body.data)).toBe(true);
    } else {
      expect(res.body).toHaveProperty('message', 'No characters found for this anime');
    }
  });
});
