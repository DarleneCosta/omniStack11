const request = require('supertest');
const app = require('../../app');
const connection = require('../../database/connection');

describe('ONG', () => {
  beforeEach(async ()=>{
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });/*antes de cada teste*/

  afterAll(async ()=>{
    await connection.destroy();
  });/* faz depois de todos os testes*/

  it('should be able to create a new ONG', async() => {
    const response = await request(app)
    .post('/ongs')
    .send({
      name: "APAD",
      email: "contato@apad.com.br",
      whatsapp: "11976768888",
      city: "Rio do Sul",
      uf: "SC"
    });
    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  });
});