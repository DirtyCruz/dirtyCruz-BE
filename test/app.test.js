require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can POST a new note', () => {
    return request(app)
      .post('/api/v1/notes')
      .send({
        title: 'Up the Nerds!',
        body: 'I must not fear. Fear is the mind-killer...'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          title: 'Up the Nerds!',
          body: 'I must not fear. Fear is the mind-killer...',
          __v: 0
        });
      });
  });
});
