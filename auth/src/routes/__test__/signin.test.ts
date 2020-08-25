import request from 'supertest';
import { app } from '../../app';

it('fails when an email that does not exist is supplied', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'donotexist@email.com',
      password: 'passwd'
    })
    .expect(400);
})

it('fails when an incorrect password is supplied', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'passwd'
    })
    .expect(201);

  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'asdasdasd'
    })
    .expect(400);
})

it('responds with a cookie when given valid creds', async () => {

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'passwd'
    })
    .expect(201);

  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'passwd'
    })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});