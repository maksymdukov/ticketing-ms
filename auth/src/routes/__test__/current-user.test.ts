import request from 'supertest';
import { app } from '../../app';

it('responds with details about current user', async () => {
  const cookie = await global.signin();

  const response2 = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(response2.body.currentUser.email).toBe('test@test.com');
});

it('responds with currentUser = null when not authenticated', async () => {
  const response = await request(app)
    .get('/api/users/currentuser')
    .send()
    .expect(200);

  expect(response.body.currentUser).toBe(null);
});