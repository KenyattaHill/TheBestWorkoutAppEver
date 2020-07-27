const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../index');
const { User } = require('../models');

describe('Testing the Authorization endpoints', () => {

  it('Tests the signUp POST endpoint', async () => {
    const response = await supertest(app).post('/api/auth/signUp').send({
      firstName: 'Test',
      lastName: 'Account',
      userName: 'thisisatest',
      email: 'testing@test.com',
      password: 'T3$tiNg123'
    })

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('user was registered correctly')
  })

  it('Tests the signIn POST endpoint', async () => {
    const response = await supertest(app).post('/api/auth/signIn').send({
      userName: 'thisisatest',
      password: 'T3$tiNg123'
    })

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('firstName')
    expect(response.body).toHaveProperty('lastName')
    expect(response.body).toHaveProperty('email')
    expect(response.body).toHaveProperty('accessToken')
    expect(response.body).toHaveProperty('userName')
  })

  afterAll(async () => {
    await User.deleteOne({
      userName: 'thisisatest'
    })
    app.close()
    mongoose.connection.close();
  })
})