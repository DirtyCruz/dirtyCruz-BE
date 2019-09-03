require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Note = require('../lib/models/Note');

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

  it('can GET all notes', async() => {
    await Note.create([
      { title: 'Wiz-Bang!', body: 'Whatseewhozit!' },
      { title: 'Shumalumma', body: 'Ammulamuhs' }
    ]);
    return request(app)
      .get('/api/v1/notes')
      .then(res => {
        expect(res.body).toContainEqual({
          _id: expect.any(String),
          title: 'Wiz-Bang!', 
          body: 'Whatseewhozit!',
          __v: 0
        });
      });
  });
});
